import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import ProfSession from './ProfSession'
import { IconButton, DownloadIcon } from 'evergreen-ui'

export default function ProfSDownload() {
    const componentRef = useRef();
    return (
        <div>
            <div className="d-flex justify-content-center align-items-center py-2">
                <ReactToPrint
                    trigger={() => <IconButton icon={DownloadIcon} intent="success" />}
                    content={() => componentRef.current}
                />
            </div>
            <ProfSession ref={componentRef} />
        </div>
    )
}

   

