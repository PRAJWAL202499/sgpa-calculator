const GradePoints = (totalMarks) => {
    if (totalMarks >= 90) return 10;
    if (totalMarks >= 80) return 9;
    if (totalMarks >= 70) return 8;
    if (totalMarks >= 60) return 7;
    if (totalMarks >= 50) return 6;
    if (totalMarks >= 40) return 5;
    if (totalMarks >= 38) return 4;
    return 0;
};

const calculateGPA = (info) => {
    // List of subjects and their respective VTU credits
    const subjects = [
        { marks: info.dsdv, credits: 3 },
        { marks: info.epc, credits: 3 },
        { marks: info.na, credits: 3 },
        { marks: info.coa, credits: 3 },
        { marks: info.math, credits: 3 },
        { marks: info.adsdl, credits: 1 },
        { marks: info.lpl, credits: 1 },
        { marks: info.scr, credits: 1 }
    ];

    let totalCreditPoints = 0;
    let totalCredits = 0;

    subjects.forEach(sub => {
        const gp = GradePoints(Number(sub.marks));
        totalCreditPoints += gp * sub.credits;
        totalCredits += sub.credits;
    });

    const sgpa = totalCreditPoints / totalCredits;
    return sgpa.toFixed(2); 
};

module.exports = {calculateGPA};