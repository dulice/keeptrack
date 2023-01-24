import { Project } from './Project';
const baseUrl = "http://localhost:4000";
export const url = `${baseUrl}/projects`;

const errorMessage = (status: number) => {
    switch (status) {
        case 401:
            return "Please login again.";
        case 403:
            return "You do not have permission to view projects.";
        default:
            return "There was an error retrieving the project. Please try again.";
    }
}

const checkStatus = (response: any) => {
    if(response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        }
        console.log(`log http error: ${JSON.stringify(httpErrorInfo)}`);
        throw new Error(errorMessage(httpErrorInfo.status));
    }
}

const parseJSON = (response: Response) => {
    return response.json();
}

const delay = (ms: number) => {
    return function (x: any): Promise<any> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

const convertToProjectModel = (item: any) : Project => {
    return new Project(item);
}

const convertToProjectModels = (projects: any[]) : Project[] => {
    return projects.map(project => convertToProjectModel(project));
}

const projectAPI = {
    async get(page=1, limit=20) {
        try {
            const response = await fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`);
            const response_1 = await checkStatus(response);
            const projects = await parseJSON(response_1);
            return convertToProjectModels(projects);
        } catch (err) {
            console.log(`client error: ${err}`);
            throw new Error('There was an error retrieving the project. Please try again.');
        }
    },

    async put(project: Project) {
        try {
            const response = await fetch(`${url}/${project.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify(project),
            });
            const response_1 = await checkStatus(response);
            return parseJSON(response_1);
        } catch (err) {
            console.log(`client error: ${err}`);
            throw new Error('There was an error retrieving the project. Please try again.');
        }
    },

    async find(id: number) {
        try {
            const response = await fetch(`${url}/${id}`);
            const response_1 = await checkStatus(response);
            const projects = await parseJSON(response_1);
            return convertToProjectModel(projects);
        } catch (err) {
            console.log(`client error: ${err}`);
            throw new Error('There was an error retrieving the project. Please try again.');
        }
    },
}

export { projectAPI };