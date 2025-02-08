import axios from '../node_modules/axios/index';
export const DOAMIN_PATH = 'https://krishikhamar.com/'
export const VUE_APP_API_URL = 'https://api.krishikhamar.com/api/'
export const VUE_APP_FILE_URL = 'https://file.krishikhamar.com/'

export async function category() {
    const response = await axios.get(DOAMIN_PATH + 'category');
    return response.data;
}

export async function categoryGetData(id: number) {
    const response = await axios.get(DOAMIN_PATH + `category/${id}`);
    return response.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function categoryCreateData(payload: any) {
    const response = await axios.post(DOAMIN_PATH + 'category', payload);
    if (response.status == 201) {
        return response.data;
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function CategoryUpdateData(id: number, data: any) {
    const response = await axios.put(DOAMIN_PATH + `category${id}`, data);
    return response.data;
}
export async function categoryDeleteData(id: number) {
    const response = await axios.delete(DOAMIN_PATH + `category/${id}`);
    return response.data;
}