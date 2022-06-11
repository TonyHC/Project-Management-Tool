export const splitActionType = (actionType, separator) => {
    const type = actionType.split(separator)[1];
    return type;
}