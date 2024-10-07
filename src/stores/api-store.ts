import { defineStore } from 'pinia';
import { api } from '../boot/axios';

interface CreatePerson {
  name: string;
  age: number;
}

export const useApiStore = defineStore('api', {
  state: () => ({
    getData: [],
  }),
  getters: {
    getDate: (state) => state.getData,
  },
  actions: {
    // Get
    async actionGetDate() {
      await api
        .get('https://dahua.metcfire.com.tw/api/CRUDTest/a')
        .then((res) => {
          console.log(res.data);
          this.getData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  // Post
  async actionCreateDate(paramDate: CreatePerson) {
    interface Person {
      name: string;
      age: number;
    }

    const person: Person = {
      name: `${paramDate.name}`,
      age: paramDate.age,
    };

    await api
      .post('https://dahua.metcfire.com.tw/api/CRUDTest', person)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
});
