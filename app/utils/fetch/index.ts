export const request = (
    url: string,
    params: any = {},
): Promise<[number, any]> => {
    return fetch(url, params).then(response => {
        console.log('STATUS', response.status);

        return Promise.all<number, any>([
            response.status,
            response.json(),
        ]);
    });
};
