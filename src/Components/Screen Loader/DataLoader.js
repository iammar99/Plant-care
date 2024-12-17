import React from 'react'

export default function DataLoader() {
    return (
        <div className='d-flex justify-content-center'>
            <div className="data-loader">
                <p className="heading">Loading</p>
                <div className="loading">
                    <div className="data-load" />
                    <div className="data-load" />
                    <div className="data-load" />
                    <div className="data-load" />
                </div>
            </div>
        </div>
    )
}
