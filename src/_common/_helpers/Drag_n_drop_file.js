import React, { useState } from "react"
import { useDropzone } from "react-dropzone"

function Drang_Drop_File({ filetype, Returndata, toggle_spinner }) {
    const [files, setFiles] = useState([])


    React.useEffect(() => {
        if (files.length > 0) {
            Returndata(files)
        } else {
        }
    }, [files])



    const { getRootProps, getInputProps } = useDropzone({
        accept: filetype,
        onDrop: (acceptedFiles) => {
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
    })



    return (
        <>
            <div className="uplaod-button-wrap"  {...getRootProps()}>
                <div></div>

                <div className="middle-content ">
                    <div className="button-wrap">
                        <label className="new-button" htmlFor="upload">+ Upload File
                          <input {...getInputProps()} />
                        </label>
                    </div>
                    <p className="text-color mb-0 upload-text">Or you can drag & drop your file</p>
                </div>
            </div>
        </>
    )
}

export default Drang_Drop_File