import Titles from "../components/ProjectBoard/ProjectTask/ProjectTaskTitle";

export const projectTaskStatus = (index) => {
  if (index === 0) {
    return Titles.To_Do;
  } else if (index === 1) {
    return Titles.In_Progress;
  } else {
    return Titles.Done;
  }
};