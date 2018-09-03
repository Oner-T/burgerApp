export const updateObject = (state, updatedProperties) => {
    return {
        ...state,
        ...updatedProperties
    }
}