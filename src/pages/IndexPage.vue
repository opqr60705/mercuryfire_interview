<template>
  <q-page class="row q-pt-xl">
    <div class="full-width q-px-xl">
      <div class="q-mb-xl">
        <q-input v-model="tempData.name" label="姓名" />
        <q-input v-model="tempData.age" label="年齡" />
        <q-btn @click="handleClickCreate()" color="primary" class="q-mt-md"
          >新增</q-btn
        >
      </div>

      <q-table
        flat
        bordered
        ref="tableRef"
        :rows="blockData"
        :columns="(tableConfig as QTableProps['columns'])"
        row-key="id"
        hide-pagination
        separator="cell"
        :rows-per-page-options="[0]"
      >
        <template v-slot:header="props">
          <q-tr :props="props">
            <q-th v-for="col in props.cols" :key="col.name" :props="props">
              {{ col.label }}
            </q-th>
            <q-th></q-th>
          </q-tr>
        </template>

        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              v-for="col in props.cols"
              :key="col.name"
              :props="props"
              style="min-width: 120px"
            >
              <div>{{ col.value }}</div>
            </q-td>
            <q-td class="text-right" auto-width v-if="tableButtons.length > 0">
              <q-btn
                @click="handleClickOption(btn, props.row)"
                v-for="(btn, index) in tableButtons"
                :key="index"
                size="sm"
                color="grey-6"
                round
                dense
                :icon="btn.icon"
                class="q-ml-md"
                padding="5px 5px"
              >
                <q-tooltip
                  transition-show="scale"
                  transition-hide="scale"
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  {{ btn.label }}
                </q-tooltip>
              </q-btn>
            </q-td>
          </q-tr>
        </template>
        <template v-slot:no-data="{ icon }">
          <div
            class="full-width row flex-center items-center text-primary q-gutter-sm"
            style="font-size: 18px"
          >
            <q-icon size="2em" :name="icon" />
            <span> 無相關資料 </span>
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import axios from 'axios';
import { QTableProps } from 'quasar';
import { ref, computed, onMounted } from 'vue';
import { useApiStore } from '../stores/api-store';
/* interface */
interface btnType {
  label: string;
  icon: string;
  status: string;
}

/* store */
const apiStore = useApiStore();

/* variable */
const blockData = computed(() => apiStore.getDate);
const tableConfig = ref([
  {
    label: '姓名',
    name: 'name',
    field: 'name',
    align: 'left',
  },
  {
    label: '年齡',
    name: 'age',
    field: 'age',
    align: 'left',
  },
]);
const tableButtons = ref([
  {
    label: '編輯',
    icon: 'edit',
    status: 'edit',
  },
  {
    label: '刪除',
    icon: 'delete',
    status: 'delete',
  },
]);

const tempData = ref({
  name: '',
  age: '',
});

/* function */
function handleClickCreate() {
  // apiStore.actionCreateDate(tempData.value);
  axios
    .post('https://dahua.metcfire.com.tw/api/CRUDTest', tempData.value)
    .then((res) => {
      console.log(res.data);
      if (res.data === true) {
        apiStore.actionGetDate();
      } else {
        console.log('新增失敗');
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
function handleClickOption(btn, data) {
  console.log(btn, data);
  // 判斷btn狀態
  if (btn.status === 'edit') {
    // Edit
    axios
      .patch('https://dahua.metcfire.com.tw/api/CRUDTest', data)
      .then((res) => {
        // console.log(res);
        if (res.data === true) {
          apiStore.actionGetDate();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else if (btn.status === 'delete') {
    // Delete
    axios
      .delete(`https://dahua.metcfire.com.tw/api/CRUDTest/${data.id}`, data)
      .then((res) => {
        // console.log(res);
        if (res.data === true) {
          apiStore.actionGetDate();
        } else {
          console.log('刪除失敗');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

/* lifecycle */
onMounted(() => {
  apiStore.actionGetDate();
});
</script>

<style lang="scss" scoped>
.q-table th {
  font-size: 20px;
  font-weight: bold;
}

.q-table tbody td {
  font-size: 18px;
}
</style>
