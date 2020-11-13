import { Alert } from "rsuite";
import { DEFAULT_TOAST_DURATION } from "../constants";

function useToastManager() {
  const onError = (message, duration = DEFAULT_TOAST_DURATION) =>
    Alert.error(message, duration);

  const onSuccess = (message, duration = DEFAULT_TOAST_DURATION) =>
    Alert.success(message, duration);

  const onInfo = (message, duration = DEFAULT_TOAST_DURATION) =>
    Alert.info(message, duration);

  return {
    onError,
    onSuccess,
    onInfo,
  };
}

export default useToastManager;
