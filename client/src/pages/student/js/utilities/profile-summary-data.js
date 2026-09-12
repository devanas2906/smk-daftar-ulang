export const getStudentProfileSummaryData = ({ name, nisn, class: studentClass, major, batch }) => {
    const className = studentClass ? studentClass.className : "-";
    const majorName = major ? major.majorName : "-";
    const entryYear = batch ? batch.entryYear : "-";

    return [
        { label: "Nama", data: name },
        { label: "NISN", data: nisn },
        { label: "Kelas", data: className },
        { label: "Jurusan", data: majorName },
        { label: "Angkatan", data: entryYear },
    ];
};