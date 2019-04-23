import React from 'react'
import TableRow from '../../common/TableRow'
import TableHeader from '../../common/TableHeader'
import TableComponent from '../../common/TableComponent';
import DataTable from '../../common/DataTable';


const ClientList = ({ data }) => {

    console.log('this.props.data', data)
    const headings = data[0]
    console.log('headings:', headings)

    return (
        <React.Fragment>
            <DataTable headings={headings} rows={rows} />

        </React.Fragment>
    )

}

export default ClientList


const headings = [
    'Name',
    'Profession',
    'Title',
    'Specialty',
    'Company',
    'Address',
    'Region',
    'Email',
    'Phone',
    'Website',
    'LinkedIn',
    'MemberSince',
];

const rows = [
    [
        "Elizabeth Acevedo",
        "Attorney",
        "Associate",
        "",
        "Weinstock Manion, A Law Corporation",
        "1875 Century Park East Suite 2000 Los Angeles, CA 90067",
        "Beverly Hills IV",
        "eacevedo@weinstocklaw.com",
        "310 553-8844",
        "https://www.weinstocklaw.com/elizabeth-g-acevedo.html",
        "",
        " Jun 15, 2018"
    ],
    [
        "Lisa Alexander",
        "Attorney",
        "",
        "Estate Planning",
        "Jakle & Alexander, LLP",
        "1250 6th Street Suite 300 Santa Monica, CA 90401-1612",
        "Women's Affinity Group  (EC), ",
        "alexander@jaklelaw.com",
        "3103956555",
        "www.jaklelaw.com",
        "",
        " Feb 01, 2011"
    ],
    [
        "Arlyn Alonzo",
        "Attorney",
        "Founding Partner",
        "Intellectual Property, Patent",
        "Alonzo & Associates",
        "1015 Garnet Street  Redondo Beach, California 90277",
        "Beverly Hills V, ",
        "iplaw@alonzoasso.com",
        "310-291-6738 (Voice & Text)",
        "www.alonzoasso.com",
        "",
        " Oct 08, 2018"
    ],
    [
        "Katherina Alznauer",
        "Attorney",
        "",
        "Immigration",
        "Perry & Associates",
        "16501 Ventura Blvd. Suite 620 Encino, CA 91436",
        "Beverly Hills V",
        "kate@johnperryandassociates.com",
        "818-849-5905",
        "",
        "",
        " Jan 16, 2018"
    ],
    [
        "Raymond Aver",
        "Attorney",
        "Esquire",
        "Bankruptcy, Business Litigation, Real Estate Litigation, Other",
        "Law Offices of Raymond H. Aver, APC",
        "10801 National Boulevard Suite 100 Los Angeles, CA 90064",
        "Beverly Hills I",
        "ray@averlaw.com",
        "3105713511",
        "www.averlaw.com",
        "",
        " Jun 01, 2001"
    ],
    [
        "Matthew Baker",
        "Attorney",
        "",
        "",
        "RMO LLP",
        "2029 Century Park East Suite 2910 Los Angeles, CA 90067",
        "Growth Affinity Group, ",
        "bakerm@rmolawyers.com",
        "424.320.9442",
        "www.rmolawyers.com",
        "www.linkedin.com/in/matthew-baker-829a9028/",
        " Dec 04, 2018"
    ],
    [
        "Chet Bhavsar",
        "Attorney",
        "",
        "Personal Injury / Malpractice",
        "Law Office of Chet R. Bhavsar, APC",
        "2049 Century Park East Suite 3850 Los Angeles, CA 90067",
        "Beverly Hills III",
        "chetbhavsar@yahoo.com",
        "(310) 751-7461",
        "www.cblawoffice.com",
        "",
        " Jan 28, 2019"
    ],

];