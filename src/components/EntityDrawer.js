import dayjs from "dayjs";
import { useState } from "react";
import {
  Drawer,
  Button,
  Placeholder,
  FlexboxGrid,
  Tag,
  List,
  Modal,
  Icon,
  Panel,
} from "rsuite";

import { USER } from "../util/constants";

const accountsMap = {
  [USER.ACCOUNT_TYPES.COUNSELLOR]: ["user-o", "Counsellor"],
  [USER.ACCOUNT_TYPES.HEALTH_FACILITY]: ["building-o", "Health facility"],
  [USER.ACCOUNT_TYPES.USER]: ["user", "User"],
};

function ConfirmModal({ isOpen, onClose, onConfirm, children }) {
  return (
    <Modal backdrop="static" show={isOpen} onHide={onClose} size="xs">
      <Modal.Body>
        <Icon
          icon="remind"
          style={{
            color: "#ffb300",
            fontSize: 24,
          }}
        />
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onConfirm} appearance="primary">
          Ok
        </Button>
        <Button onClick={onClose} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function GuideBody({ guide }) {
  if (!guide) {
    return null;
  }

  const { body, links, tags } = guide;
  return (
    <>
      <p>{body}</p>
      <div
        style={{
          margin: "0.75em 0",
        }}
      >
        {tags.map((tag, index) => (
          <Tag key={index} color="blue">
            {tag}
          </Tag>
        ))}
      </div>
      <h6>External links</h6>
      <List>
        {links.map((link, index) => {
          const [text, url] = link.split(",").map((lnk) => lnk.trim());
          return (
            <List.Item key={index} index={index}>
              <p className="margin-0">
                <strong>{text}</strong>
              </p>
              <small>{url}</small>
            </List.Item>
          );
        })}
      </List>
    </>
  );
}

function UserBody({ user }) {
  if (!user) {
    return null;
  }

  const {
    accountType,
    email,
    username,
    phone,
    experience,
    speciality,
    createdAt,
  } = user;
  const accountLable = accountType ? accountsMap[accountType][1] : "Unset";
  const accountIcon = accountType ? accountsMap[accountType][0] : "user-times";

  return (
    <>
      <p className="margin-0">Username: {username}</p>
      <p className="margin-0">Email: {email}</p>
      {phone && <p className="margin-0">Phone: {phone}</p>}
      <p className="margin-0">
        Speciality: <strong>{speciality || "Unset"}</strong>
      </p>
      {experience && <p>Experience: {`${experience} years experience.`}</p>}
      <p>
        Account type: <strong>{accountLable}</strong>{" "}
        <Icon icon={accountIcon} />
      </p>
      <p>
        Member since: <strong>{dayjs(createdAt).format("MMM D, YYYY")}</strong>
      </p>
    </>
  );
}

function EntityDrawer({ entity, clearSelected, onUpdate, isUpdating }) {
  const isGuide = entity && !!entity.title;
  const [showModal, setShowModal] = useState(false);
  const isActive = entity && entity.active;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const onUpdateEntity = () => {
    onUpdate(entity._id);
    closeModal();
  };

  return (
    <>
      <ConfirmModal
        isOpen={showModal}
        onClose={closeModal}
        onConfirm={onUpdateEntity}
      >
        {entity && (
          <p>
            You are about to {isActive ? "deactivate" : "activate"}{" "}
            <strong>
              {isGuide ? (
                `Post: ${entity._id}`
              ) : (
                <span className="text-upper">{entity.fullName}</span>
              )}
            </strong>
          </p>
        )}
      </ConfirmModal>

      <Drawer show={!!entity} onHide={clearSelected} className="fancy-drawer">
        <Drawer.Header>
          <Drawer.Title className="text-capitalize">
            {entity ? (
              isGuide ? (
                entity.title
              ) : (
                entity.fullName
              )
            ) : (
              <Placeholder.Paragraph
                rows={1}
                style={{
                  width: 50,
                }}
              />
            )}
          </Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          {!isActive && (
            <>
              <Icon icon="ban" className="ban-icon" />
              {"  "}Account inactive
            </>
          )}

          {entity &&
            (entity.title ? (
              <GuideBody guide={entity} />
            ) : (
              <UserBody user={entity} />
            ))}

          <Panel
            bordered
            style={{
              marginTop: "1em",
            }}
          >
            <FlexboxGrid justify="space-between">
              <FlexboxGrid.Item>
                <Button onClick={clearSelected} appearance="subtle">
                  Exit
                </Button>
              </FlexboxGrid.Item>
              <FlexboxGrid.Item>
                <Button
                  onClick={openModal}
                  disabled={isUpdating}
                  color={isActive ? "red" : "green"}
                  appearance="primary"
                >
                  {isActive ? "Deactivate" : "Activate"}
                </Button>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Panel>
        </Drawer.Body>
        {/* <Drawer.Footer>
          
        </Drawer.Footer> */}
      </Drawer>
    </>
  );
}

export default EntityDrawer;
