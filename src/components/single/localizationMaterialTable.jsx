import React, {forwardRef} from "react";
// link www https://material-table.com/#/docs/features/localization
import MaterialTable from "material-table";
import {ruRU} from "@material-ui/core/locale";

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import ThemeProvider from "react-bootstrap/ThemeProvider";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

const theme = createMuiTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, ruRU);



function RusMaterialTable() {
  const [state, setState] = React.useState({

  });



  return (
    <ThemeProvider theme={theme}>
    <MaterialTable

      editable={{
        // onRowAdd: (newData) => {
        //   setState((prevState) => {
        //     const data = [...prevState.data];
        //     data.push(newData);
        //     return { ...prevState, data };
        //   });
        // }
        //  ,
        onRowUpdate: (newData, oldData) => {
          if (oldData) {
            setState((prevState) => {
              const data = [...prevState.data];
              data[data.indexOf(oldData)] = newData;
              return { ...prevState, data };
            });
          }
        }
      ,
        onRowDelete: (oldData) => {
          setState((prevState) => {
            const data = [...prevState.data];
            data.splice(data.indexOf(oldData), 1);
            return { ...prevState, data };
          });
        }
      }}

      icons={tableIcons}
      title="Список пользователей"
      columns={[
        { title: 'Номер', field: 'id' },
        { title: 'Имя', field: 'name' },
        { title: 'Фамилия', field: 'surname' },
        { title: 'Год ', field: 'birthYear', type: 'numeric' },
        {
          title: 'Город',
          field: 'birthCity',
          lookup: { 42: 'Смоленск', 47: 'Пермь' },
        },
      ]}
      data={[
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '1', name: 'Андрей', surname: 'Михайлов', birthYear: 1979, birthCity: 42, mail: 'wishco@yandex.ru' },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
        { id: '2', name: 'Паша', surname: 'Соин', birthYear: 1980, birthCity: 47 },
      ]}
      localization={{
        body: {
          emptyDataSourceMessage: 'Нет записей',
          addTooltip: 'Добавить элемент',
          deleteTooltip: 'Удалить запись',
          editTooltip: 'Редактировать запись',
          filterRow: {
            filterTooltip: 'Фильтр'
          },
          editRow: {
            deleteText: 'Удалить текущую запись?',
            cancelTooltip: 'Отменить текущие действия?',
            saveTooltip: 'Подтвердить текущие действия?'
          }
        },
        grouping: {
          placeholder: 'Перетаскивание столбцов ...',
          groupedBy: 'Сгруппированы по:'
        },
        header: {
          actions: 'Опции'
        },
        pagination: {
          labelDisplayedRows: '{from}-{to} из {count}',
          labelRowsSelect: 'количество рядов',
          labelRowsPerPage: 'Рядов на странице:',
          firstAriaLabel: 'Первый',
          firstTooltip: 'В начало списка',
          previousAriaLabel: 'предыдущий',
          previousTooltip: 'предыдущий',
          nextAriaLabel: 'следующий',
          nextTooltip: 'следующий',
          lastAriaLabel: 'Последний',
          lastTooltip: 'В конец списка'
        },
        toolbar: {
          addRemoveColumns: 'Добавление или удаление столбцов',
          nRowsSelected: '{0} Выбраны (n) строки',
          showColumnsTitle: 'Показать название колонки',
          showColumnsAriaLabel: 'Zeige Spalten 116',
          exportTitle: 'Экспорт',
          exportAriaLabel: 'Экспорт',
          exportName: 'Экспорт как CSV',
          searchTooltip: 'Введите в поле, что хотите найти в списке',
          searchPlaceholder: 'найти'
        }
      }}
    />
    </ThemeProvider>
  )
}

export default RusMaterialTable;