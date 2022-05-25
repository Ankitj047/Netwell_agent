//DataTable.js
import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
 
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown'
import Box from '@material-ui/core/Box'
import Collapse from '@material-ui/core/Collapse'

import moment from "moment";
import {Modal,Button} from 'react-bootstrap'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
 
 
function createData(createdDate, transactionId, indicatorFlag, type, transactionAmount,authorizationMessage,paymentNumber,reason) {
 return { createdDate, transactionId, indicatorFlag, type, transactionAmount,authorizationMessage,paymentNumber,reason};
}
 
 
const theme = createMuiTheme({
 MuiTableCell:{
   paddingLeft:'30px',
 }
});
 
const rows = [
    createData('600016', '2020-04-20', 'VITALCARE FP LLC', 670, 43,'FINAL'),
    createData('600017', '2020-05-20', 'VITALCARE FP LLC', 500, 100,'IN REVIEW'),
    createData('600016', '2020-04-20', 'VITALCARE FP LLC', 670, 43,'FINAL'),
    createData('600017', '2020-05-20', 'VITALCARE FP LLC', 500, 100,'IN REVIEW'),
    createData('600016', '2020-04-20', 'VITALCARE FP LLC', 670, 43,'FINAL'),
    createData('600017', '2020-05-20', 'VITALCARE FP LLC', 500, 100,'IN REVIEW'),
    createData('600016', '2020-04-20', 'VITALCARE FP LLC', 670, 43,'FINAL'),
    createData('600017', '2020-05-20', 'VITALCARE FP LLC', 500, 100,'IN REVIEW'),
    createData('600016', '2020-04-20', 'VITALCARE FP LLC', 670, 43,'FINAL'),
    createData('600017', '2020-05-20', 'VITALCARE FP LLC', 500, 100,'IN REVIEW'),
    // createData('Eclair', 262, 16.0, 24, 6.0,'Final'),
    // createData('Frozen yoghurt', 159, 6.0, 24, 4.0,'Final'),
    // createData('Gingerbread', 356, 16.0, 49, 3.9,'Final'),
    // createData('Honeycomb', 408, 3.2, 87, 6.5,'Final'),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3,'Final'),
    // createData('Jelly Bean', 375, 0.0, 94, 0.0,'Final'),
    // createData('KitKat', 518, 26.0, 65, 7.0,'Final'),
    // createData('Lollipop', 392, 0.2, 98, 0.0,'Final'),
    // createData('Marshmallow', 318, 0, 81, 2.0,'Final'),
    // createData('Nougat', 360, 19.0, 9, 37.0,'Final'),
    // createData('Oreo', 437, 18.0, 63, 4.0,'Final'),
   ];
    

 
function descendingComparator(a, b, orderBy) {
 if (b[orderBy] < a[orderBy]) {
   return -1;
 }
 if (b[orderBy] > a[orderBy]) {
   return 1;
 }
 return 0;
}
 
function getComparator(order, orderBy) {
 return order === 'desc'
   ? (a, b) => descendingComparator(a, b, orderBy)
   : (a, b) => -descendingComparator(a, b, orderBy);
}
// function getMemberResponsibilty(x,y,z){
//    var a = numberWithCommas(floatconversion(x))
//    var b = floatconversion(y)
//    var c = floatcoversation(z)
//    var sum = a+b+c
//   return sum;
 
 
// }
 
function stableSort(array, comparator) {
 const stabilizedThis = array.map((el, index) => [el, index]);
 stabilizedThis.sort((a, b) => {
   const order = comparator(a[0], b[0]);
   if (order !== 0) return order;
   return a[1] - b[1];
 });
 return stabilizedThis.map((el) => el[0]);
}
 
 
const headCells = [
 // { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
 // { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
 // { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
 // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
 // { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
 
  { id: 'arrow', numeric: true, disablePadding: false, label: '' },
 { id: 'createdDate', numeric: true, disablePadding: false, label: 'Date' },
 // { id: 'bill_key', numeric: true, disablePadding: false, label: 'No' },
 { id: 'transactionId', numeric: false, disablePadding: false, label: 'Transaction ID' },
 { id: 'indicatorFlag', numeric: true, disablePadding: false, label: 'Flag' },
 { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
 { id: 'transactionAmount', numeric: true, disablePadding: false, label: ' Amount' },
 //{ id: 'paid_amount', numeric: false, disablePadding: false, label: ' Paid' },
 // { id: 'date_received', numeric: false, disablePadding: false, label: 'Paid Date' },
 //{ id: 'date_received', numeric: true, disablePadding: false, label: 'Paid Date' },
 { id: 'authorizationMessage', numeric: true, disablePadding: false, label: 'Aauthorization Message' },
 { id: 'paymentNumber', numeric: true, disablePadding: false, label: 'Payment Number' },
 { id: 'reason', numeric: true, disablePadding: false, label: 'Description' },
 
];
 
function EnhancedTableHead(props) {
 const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
 const createSortHandler = (property) => (event) => {
   onRequestSort(event, property);
 };
 
 return (
   <TableHead>
     <TableRow className="tableHeadRow">
       {/* <TableCell padding="checkbox">
         <Checkbox
           indeterminate={numSelected > 0 && numSelected < rowCount}
           checked={rowCount > 0 && numSelected === rowCount}
           onChange={onSelectAllClick}
           inputProps={{ 'aria-label': 'select all desserts' }}
         />
       </TableCell> */}
       {headCells.map((headCell) => (
         <>
         {
           headCell.id == 'createdDate'
           ?
           <TableCell
           key={headCell.id}
           // align={headCell.numeric ? 'right' : 'left'}
           padding={headCell.disablePadding ? 'none' : 'default'}
           sortDirection={orderBy === headCell.id ? order : false}
           className="sortheadercellColor tableHeader"
         >
           <TableSortLabel
             active={orderBy === headCell.id}
             direction={orderBy === headCell.id ? order : 'asc'}
             onClick={createSortHandler(headCell.id)}
             className="headercellColor tableHeader"
           >
             {headCell.label}
             {orderBy === headCell.id ? (
               <span className={classes.visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </span>
             ) : null}
           </TableSortLabel>
         </TableCell>
           :
           <TableCell
           key={headCell.id}
           // align={headCell.numeric ? 'right' : 'left'}
           padding={headCell.disablePadding ? 'none' : 'default'}
           sortDirection={orderBy === headCell.id ? order : false}
           className="headercellColor tableHeader"
         >
           <TableSortLabel
             active={orderBy === headCell.id}
             direction={orderBy === headCell.id ? order : 'asc'}
             onClick={createSortHandler(headCell.id)}
             className="headercellColor tableHeader"
           >
             {headCell.label}
             {orderBy === headCell.id ? (
               <span className={classes.visuallyHidden}>
                 {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
               </span>
             ) : null}
           </TableSortLabel>
         </TableCell>
         }
         </>
 
       ))}
     </TableRow>
   </TableHead>
 );
}
 
EnhancedTableHead.propTypes = {
 classes: PropTypes.object.isRequired,
 numSelected: PropTypes.number.isRequired,
 onRequestSort: PropTypes.func.isRequired,
 onSelectAllClick: PropTypes.func.isRequired,
 order: PropTypes.oneOf(['asc', 'desc']).isRequired,
 orderBy: PropTypes.string.isRequired,
 rowCount: PropTypes.number.isRequired,
};
 
const useToolbarStyles = makeStyles((theme) => ({
 root: {
   paddingLeft: theme.spacing(2),
   paddingRight: theme.spacing(1),
 },
 highlight:
   theme.palette.type === 'light'
     ? {
         color: theme.palette.secondary.main,
         backgroundColor: lighten(theme.palette.secondary.light, 0.85),
       }
     : {
         color: theme.palette.text.primary,
         backgroundColor: theme.palette.secondary.dark,
       },
 title: {
   flex: '1 1 100%',
 },
}));
 
// const EnhancedTableToolbar = (props) => {
//   const classes = useToolbarStyles();
//   const { numSelected } = props;
 
//   return (
//     <Toolbar
//       className={clsx(classes.root, {
//         [classes.highlight]: numSelected > 0,
//       })}
//     >
//       {numSelected > 0 ? (
//         <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
//           Nutrition
//         </Typography>
//       )}
 
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton aria-label="delete">
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton aria-label="filter list">
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// };
 
// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };
 
const useStyles = makeStyles((theme) => ({
 root: {
   width: '100%',
 },
 paper: {
   width: '100%',
   marginBottom: theme.spacing(2),
 },
 table: {
   minWidth: 750,
 },
 visuallyHidden: {
   border: 0,
   clip: 'rect(0 0 0 0)',
   height: 1,
   margin: -1,
   overflow: 'hidden',
   padding: 0,
   position: 'absolute',
   top: 20,
   width: 1,
 },
}));
 
export default function TransactionTable(props) {
 const classes = useStyles();
 const [order, setOrder] = React.useState('desc');
 const [orderBy, setOrderBy] = React.useState('createdDate');
 const [selected, setSelected] = React.useState([]);
 const [page, setPage] = React.useState(0);
 const [dense, setDense] = React.useState(false);
 const [rowsPerPage, setRowsPerPage] = React.useState(10);
 const {tableData} = props;
 useEffect(() => {
     console.log("props----",props)
 });
 
 
 
 
 
 const handleRequestSort = (event, property) => {
   const isAsc = orderBy === property && order === 'asc';
   setOrder(isAsc ? 'desc' : 'asc');
   setOrderBy(property);
 };
 
 const handleSelectAllClick = (event) => {
   if (event.target.checked) {
     const newSelecteds = rows.map((n) => n.name);
     setSelected(newSelecteds);
     return;
   }
   setSelected([]);
 };
 
 const handleClick = (event, name) => {
   const selectedIndex = selected.indexOf(name);
   let newSelected = [];
 
   if (selectedIndex === -1) {
     newSelected = newSelected.concat(selected, name);
   } else if (selectedIndex === 0) {
     newSelected = newSelected.concat(selected.slice(1));
   } else if (selectedIndex === selected.length - 1) {
     newSelected = newSelected.concat(selected.slice(0, -1));
   } else if (selectedIndex > 0) {
     newSelected = newSelected.concat(
       selected.slice(0, selectedIndex),
       selected.slice(selectedIndex + 1),
     );
   }
 
   setSelected(newSelected);
 };
 
 const handleChangePage = (event, newPage) => {
   setPage(newPage);
 };
 
 const handleChangeRowsPerPage = (event) => {
   setRowsPerPage(parseInt(event.target.value, 10));
   setPage(0);
 };
 
 const handleChangeDense = (event) => {
   setDense(event.target.checked);
 };
 
 const isSelected = (name) => selected.indexOf(name) !== -1;
 
 const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
 
 
 
 return (
   <div className={classes.root}>
     <Paper className={'tableContainer ' + classes.paper}>
       {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
       {/* <div className="tablefixheight"> */}
       
       
       {tableData && tableData.length>0 ?
       
       <TableContainer style={{height: 250}}>
         <Table
           className={classes.table}
           aria-labelledby="tableTitle"
           size={dense ? 'small' : 'medium'}
           aria-label="enhanced table"
           stickyHeader
         >
           <EnhancedTableHead
             classes={classes}
             numSelected={selected.length}
             order={order}
             orderBy={orderBy}
             onSelectAllClick={handleSelectAllClick}
             onRequestSort={handleRequestSort}
             rowCount={rows.length}
           />
 
           <TableBody>

               
             {
             stableSort(tableData, getComparator(order, orderBy))
               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
               .map((tableData, index) => {
                 const isItemSelected = isSelected(tableData.name);
                 const labelId = `enhanced-table-checkbox-${index}`;
 
                 return (
                     
                     <Row key={tableData.transactionId} row={tableData} />
                  
                 );
               })
           
            }
             {/* {emptyRows > 0 && (
               <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                 <TableCell colSpan={6} />
               </TableRow>
             )} */}
           </TableBody>
           
          
          
 
         </Table>
       </TableContainer>
       
       :
       <div className="noRecord"> Sorry, No records found.</div>
    }
 
       <TablePagination
       style={{position:'relative'}}
         rowsPerPageOptions={[10,25,100]}
         component="div"
         count={tableData.length}
         rowsPerPage={rowsPerPage}
         page={page}
         onChangePage={handleChangePage}
         onChangeRowsPerPage={handleChangeRowsPerPage}
       />
     
     </Paper>
 
   </div>
 );
}
 
 
 
 
 
function Row(props) {
 const { row } = props
 const [open, setOpen] = React.useState(false)
 const classes = useRowStyles()
 
 const [modalShow, setModalShow] = React.useState(false);
 
 const getDate = (date) => {
   const isDateValid = moment(date)['_isValid'];
   if (isDateValid) {
       return moment(date).format('MMMM D, YYYY');
   }
   return date;
 }
 console.log("Row----",props)
 
 const numberWithCommas = (x) => {
   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
 }
 
 const floatconversion = (x) => {
   return x.toFixed(2)
 }

 //function takes in two dates and add the dash between them to show the continuation
 const combineDate = (x,y) => {
  if(x==y)
    {return x}

  const z = (x+ '-' + y)
  return z


 }


 return (
   <React.Fragment>
      <ThemeProvider theme={theme}>
     <TableRow className={'rowTable ' + classes.root}>
        <TableCell className="rowTableCell">
         <IconButton className="tableExpandIcon" aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
           {open ? <KeyboardArrowDown /> : <KeyboardArrowRight />}
         </IconButton>
       </TableCell>
       <TableCell component="th" scope="row" className="rowcellcolor rowTableCell"  >
       {getDate(row.createdDate)}
       </TableCell>
       <TableCell component="th" scope="row" className="rowcellcolor rowTableCell"  >
         {row.transactionId!=null ?row.transactionId :'0'}
       </TableCell>
       <TableCell align="left" className="sortrowcellcolor rowTableCell">
         {row.indicatorFlag!=null ? row.indicatorFlag :'NA'}
       </TableCell>
       <TableCell align="left" className="rowcellcolor rowTableCell">
         {row.type !=null?row.type:'NA'}
       </TableCell>
       <TableCell align="left" className="rowcellcolor rowTableCell">
         ${row.transactionAmount !=null ? row.transactionAmount :'NA'}
        
       </TableCell>
       <TableCell align="left" className="rowcellcolor rowTableCell">
         {row.authorizationMessage !=null ? row.authorizationMessage :'NA'}
        
       </TableCell>
       <TableCell align="left" className="rowcellcolor rowTableCell">
         {row.paymentNumber !=null ? row.paymentNumber :'0'}
        
       </TableCell>
       <TableCell align="left" className="rowcellcolor rowTableCell">
         {row.reason !=null ?row.reason :'NA'}
        
       </TableCell>
       
     </TableRow>

     
 
    
 
 
             
                   
    
     {/* The Following table row is used to for the information of the dropdown rows that explain the EOS */}
     <TableRow>
         <TableCell style={{ padding: 0 }} colSpan={12}>
           <Collapse in={open} timeout="auto" component="tr" unmountOnExit style={{ backgroundColor: '#f6f6f6' }}>
             <Box>
               {/* <Table className="collapseTableContainer" size="small" aria-label="purchases">
               <TableHead> */}
               <TableRow>
                 <TableCell component="td" align="left" className="innerTh blankCell" style={{ width: '4%' }}>
                   &nbsp;
                 </TableCell>
                 <TableCell component="td" align="left" className="innerTh blankCell" style={{ width: '4%' }}>
                   &nbsp;
                 </TableCell>
                 <TableCell align="left" className="innerTh" style={{ width: '317px' }}>
                 Membership Dues
                 </TableCell>
                 <TableCell align="left" className="innerTh" style={{ width: '404px' }}>
                 Program amount                   
                 </TableCell>
                 <TableCell align="left" className="innerTh" style={{ width: '317px' }}>
                Application Fee
                 </TableCell>
                 <TableCell align="left" className="innerTh" style={{ width: '382px' }}>
                 Health Tools
                 </TableCell>
                 <TableCell align="left" className="innerTh" style={{ width: '341px' }}>
                 RXSimpleShare
                 </TableCell>
                
                 
                
                
 
               </TableRow>
               {/* </TableHead> */}
 
               <TableBody>
                 {/* {row.inlineData.map((item) => ( */}
                 <TableRow
                 // key={item.checkNumber}
                 >
                   <TableCell component="th" scope="row" className="innerTh blankCell" align="left">
                     &nbsp;
                   </TableCell>
                   <TableCell component="th" scope="row" className="innerTh blankCell" align="left">
                     &nbsp;
                   </TableCell>
                   
 
                   <TableCell align="left" className="innerTh">
                     {
                         <>${row.uhfMonthlyFee !=null ?row.uhfMonthlyFee : '0'}</>
                       
                     }
                   </TableCell>
 
                   <TableCell align="left" className="innerTh">
                     {
                         <>${row.monthlyShare !=null ? row.monthlyShare : '0' }</>
                       
                     }
                   </TableCell>

                   <TableCell align="left" className="innerTh">
                     {
                        <>${row.applicationFee !=null ?row.applicationFee :'0'}</>
                     }
                   </TableCell>
                  
                   <TableCell align="left" className="innerTh">
                     {
                        <>${row.healthToolAmount !=null ?row.healthToolAmount :'0'}</>
                     }
                   </TableCell>
 
                   <TableCell align="left" className="innerTh">
                    <>${
                       row.rxsimpleShareAmount !=null ?row.rxsimpleShareAmount :'0'
                     }
                     </>
                   </TableCell>
 
                  
                 
 
 
                
               
                   {/* <TableCell align="left" className="innerTh">
                                    {row.refundAmount}
                                 </TableCell> */}
                   {/* <TableCell align="left" className="innerTh">
                     {row.refundDescription}
                   </TableCell> */}
 
                  
                 </TableRow>
                 {/* ))} */}
               </TableBody>
 
               {/* </Table> */}
             </Box>
           </Collapse>
         </TableCell>
       </TableRow>
       <MyVerticallyCenteredModal
       show={modalShow}
       onHide={() => setModalShow(false)}
       data={row}
     />
     </ThemeProvider>
   </React.Fragment>
 )
}
 
 
const useRowStyles = makeStyles({
 root: {
   '& > *': {
     borderBottom: 'unset'
   },
 }
})
 
 
const myrowsjsondata = [
 {
   member_id: '600016',
   bill_key: '20116',
   first_name: 'CHARLES',
   last_name: 'CASH',
   date_paid: 'None',
   date_received: '2020-04-20',
   status: 'IN REVIEW',
   charged_amount: '0.00',
   paid_amount: '0.00',
   paid_provider_name: 'aa'
 },
 {
   member_id: '600017',
   bill_key: '2046',
   first_name: 'CHARLES',
   last_name: 'CASH2',
   date_paid: '2020-05-20',
   date_received: '2020-04-21',
   status: 'FINAL',
   charged_amount: '100.00',
   paid_amount: '10.00',
   paid_provider_name: 'bb'
 },
 {
   member_id: '600018',
   bill_key: '20118',
   first_name: 'CHARLES',
   last_name: 'CASH',
   date_paid: 'None',
   date_received: '2020-04-22',
   status: 'FINAL',
   charged_amount: '200.00',
   paid_amount: '20.00',
   paid_provider_name: 'cc'
 },
 {
   member_id: '600019',
   bill_key: '2053',
   first_name: 'CHARLES',
   last_name: 'CASH2',
   date_paid: '2020-05-20',
   date_received: '2020-04-23',
   status: 'FINAL',
   charged_amount: '300.00',
   paid_amount: '30.00',
   paid_provider_name: 'VITALCARE FP LLC'
 },
 {
   member_id: '600018',
   bill_key: '201337',
   first_name: 'CHARLES',
   last_name: 'CASH',
   date_paid: 'None',
   date_received: '2020-04-24',
   status: 'IN REVIEW',
   charged_amount: '400.00',
   paid_amount: '40.00',
   paid_provider_name: 'VITALCARE FP LLC'
 },
 {
   member_id: '600019',
   bill_key: '201857',
   first_name: 'CHARLES',
   last_name: 'CASH2',
   date_paid: '2020-05-20',
   date_received: '2020-04-25',
   status: 'IN REVIEW',
   charged_amount: '0.00',
   paid_amount: '0.00',
   paid_provider_name: 'VITALCARE FP LLC',
 }
 
]
 
 
function MyVerticallyCenteredModal(props) {
 const { data } = props
 return (
   <Modal
     {...props}
     size="lg"
     aria-labelledby="contained-modal-title-vcenter"
     centered
   >
     <Modal.Header closeButton>
       <Modal.Title id="contained-modal-title-vcenter">
         My Needs
       </Modal.Title>
     </Modal.Header>
     <Modal.Body>
   <h4>{data.paid_provider_name}</h4>
       <p>
       {data.member_id}
       </p>
       <p>
       {data.charged_amount}
       </p>
       <p>
       {data.status}
       </p>
     </Modal.Body>
     <Modal.Footer>
       <Button onClick={props.onHide}>Close</Button>
     </Modal.Footer>
   </Modal>
 );
}
