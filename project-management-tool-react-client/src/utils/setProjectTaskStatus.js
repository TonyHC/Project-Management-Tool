import Status from "../constants/projectTaskStatus";

export const setProjectTaskStatus = (index) => {
  if (index === 0) {
    return Status.To_Do;
  } else if (index === 1) {
    return Status.In_Progress;
  } else {
    return Status.Done;
  }
};