import { PriceUpdateProductDto } from "src/products/dto/priceupdate-product.dto";
import axios  from 'axios';
import api from "./Api";
//import xlsxFile from 'xlsx';
const xlsxFile = require('xlsx');
const url = process.env.EXCELFILE_URL;


async function _LoadExcelData() {

  try {
    const result = await api.get(url,  { responseType: 'arraybuffer' });

    //console.log('result.data:', result.data);

    // process the excel
    let workbook = xlsxFile.read( result.data );
    let sheet_name_list = workbook.SheetNames;

    // return data sheet
    let _result = xlsxFile.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

    //console.table( _result );

    return _result;
    
  }
  catch( error ) {
    console.log( error )

    return null;
  }
}


// GET request for remote image in node.js
export function LoadExcelData()  {
 
  // get data from url
  const response = _LoadExcelData();

  return response;
}
