import { defineStore } from 'pinia';
import { api } from '../boot/axios';

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
});
