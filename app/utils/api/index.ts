/**
 * Header generator for api requests. Appends authentication token when provided.
 * @param token Optional. Authentication token for authorizing access.
 */
export const headers = (token: string = ''): HeadersInit_ => {
    const header: HeadersInit_ = {
        'Content-Type': 'application/json',
    };
    token.length > 0 ? (header.Authorization = `${token}`) : null;
    return header;
};

/**
 * Generated the api root url for each service.
 * @param endpoint Name of the service for which endpoint is being generated.
 */
export const baseURI = (endpoint: string) =>
    `http://ec2-54-234-221-60.compute-1.amazonaws.com/${endpoint}`;

