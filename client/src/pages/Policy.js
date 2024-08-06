import React from 'react'
import Layout from '../components/Layout/Layout'

const Policy = () => {
    return (
        <Layout>
            <div className="row contactus ">
                <div className="col-md-6 ">
                    <img
                        src="/images/privacy.jpg"
                        alt="contactus"
                        style={{ width: "60%" }}
                    />
                </div>
                <div className="col-md-4">
                    TERMS AND CONDITIONS<br></br>
                    This Offer is valid only in India.
                    Offer is non-transferable and is subject to availability of stocks. Myyara shall not be liable for unavailability of the stocks during the Offer Period.
                    liabilities, costs, expenses, claims, suits and proceedings (including reasonable attorney’s fee) that may be suffered by Myyara as a consequence of (i) violation of terms of this T&C and other terms of the Platform by Customer; (ii) violation of applicable laws; (iii) any action or inaction resulting in wilful misconduct or negligence on Customer’s part.
                </div>
            </div>
        </Layout>
    )
}

export default Policy