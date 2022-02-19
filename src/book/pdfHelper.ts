
export class PdfHelper{
    static customFileName(req,file,cb){
       let custom_File =  file.originalname.split(".")[0];
       custom_File = custom_File + Date.now() + Math.round(Math.random());

       let fileExt = "";

       if(file.mimetype.indexOf("jpeg") > -1){
        fileExt = "jpg"
    }else if(file.mimetype.indexOf("png") > -1){
        fileExt = "png";
    }else if(file.mimetype.indexOf("pdf") > -1){
        fileExt = "pdf";
    }
       custom_File = custom_File +"."+ fileExt;

       cb(null,custom_File)

    }

    static destinationPath(req, file, cb) {
        if(file.mimetype.indexOf("png") > -1 || file.mimetype.indexOf("jpeg") > -1){
            cb(null, './uploads/coverImgs')

        }else if(file.mimetype.indexOf("pdf") > -1){
            cb(null, './uploads/BookFiles')
        }
    }
}