import { FAKE_STUDENT_LIST } from './fake-data.js';

const getAll = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(FAKE_STUDENT_LIST);
        }, 500);
    });
};

export default { getAll }