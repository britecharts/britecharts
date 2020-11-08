export const dataKeyDeprecationMessage = (keyName) => {
    // eslint-disable-next-line no-console
    console.warn(
        `This method is being deprecated! Please modify your data to use "${keyName}" as the key.`
    );
};
