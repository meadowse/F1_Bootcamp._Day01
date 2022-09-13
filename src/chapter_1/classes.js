/*

У экземпляра класса должны присутствовать св-ва:
-name string
-grade string Для простоты предположим, что система грейдов будет иметь значения от L1 до L4
-hardSkills string[]
-company string

Так же должны иметься три метода:

-changeCompany(newCompanyName) - сотрудник может сменить компанию, либо же просто уволиться
-upGrade(newGradeName) - сотрудник может повысить квалификацию
-addSkill(newSkillName) - сотрудник может дополнить список своих скиллов.
*/

export class Empleyee {
    #grades = ['L1', 'L2','L3','L4']
    constructor (name, grade, hardSkills = [], company) {
        this.name = name
        if(this.#grades.includes(grade)) {
            this.grade = grade
        }
        this.hardSkills = hardSkills.slice()
        this.company = company
    }
    changeCompany (newCompanyName) {
        this.company = newCompanyName
    }
    upGrade () {
        for (let i = 0; i < this.#grades.length; i++) {
            if (this.#grades[i] == this.grade) {
                this.grade = this.#grades[i + 1]
                break
            }
        }
    }
    addSkill (newSkillName) {
        this.hardSkills.push(newSkillName)
    }
}

// let a = new Empleyee ('Bahti', 'L2', ['Go dev', 'lvlDesiner'] , "WB")
// a.addSkill('Front JS')
// console.log(a)

// let b = new Empleyee ('Liza Bud', 'L562', '?' , "SBER")
// b.changeCompany("PIZZA")
// console.log(b)

// let c = new Empleyee ('Noname', 'L2', '?' , "SBER")
// c.upGrade()
// console.log(c)
