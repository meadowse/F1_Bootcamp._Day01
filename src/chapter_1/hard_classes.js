/* В продолжение прошлого задания вам нужно нужно создать 4 новых класса:

- Company - класс описывающий IT компанию. Состоит из:
1. Св-ва:
- companyName
- currentProjects - текущий пулл проектов. Массив экземпляров класса Project
- completedProjects - пулл завершенных проектов. Массив экземпляров класса Project
- staff - весь пулл сотрудников компании. Это объект, у которого есть поля Developers, Managers. В этих полях лежат массивы экземпляров аналогичных классов.
2. Методы:
- addNewCompanyMember() - позволяет нанять нового сотрудника. В результате метода у выбранного сотрудника
должно смениться имя компании.
- addProject() - позволяет добавить проект в пулл текущих.
- getMembersQuantity() - позволяет получить кол-во сотрудников, работающих в данной комании

- Project - класс описывающий проект компании. На проекте может быть только 1 менеджер! Каждый сотрудник может работать только над одним проектом! Состоит из:
- Project Name
- minQualification - минимальная квалификация сотрудника, для работы на данном проекте.
- Team - команда проекта. Объект, типа {Managers: [], Developers: {Frontend : [], Backend: []}}. В св-ва этого объекта указан массив аналогичных классов.
Метод:
- completeProject() - позволяет закончить проект. В результате выполнения функции проект из currentProjects перемещается в finishedProjects. У команды данного проекта должно увеличиться кол-во завершенных проектов.
- addNewProjectMember() - Метод внутри которого вызывается проверка менеджера на то, подходит ли сотрудник проекту. Если подходит, то команда расширяется, иначе нет.

- Backend Developer - Класс, который наследуется от класса Employee. Имеет новые св-ва:
- stack - Массив в котором указаны технологии, которыми владеет разработчик.
- developerSide - 'backend'
- projectQuantity - Число завершенных проектов.
- expandStack() - разработчик может увеличить стек технологий.

- Frontend Developer - Класс, который наследуется от класса Employee. Имеет новые св-ва:
- stack - Массив в котором указаны технологии, которыми владеет разработчик.
- developerSide - 'frontend'
- projectQuantity - Число завершенных проектов.
- expandStack() - разработчик может увеличить стек технологий.

-Manager - Класс, который наследуется от класса Employee. Имеет новые св-ва:
- projectQuantity - Число завершенных проектов.

- checkMember(minQuantity) - менеджер проверяет, удовлетворяет ли сотрудник условиям проекта. Сотрудник, состоящий в другой компании не может работать над проектом другой компании.

*/

import { Empleyee } from "./classes.js"

/* Св-ва и методы класса
companyName - string
currentProjects - Массив экземпляров класса Project
completedProjects -  Массив экземпляров класса Project
staff - {
    developers :  {
    frontend : массив содержащий экземпляры класса FrontendDeveloper
    backend : массив содержащий экземпляры класса DackendDeveloper
    },
    managers: массив содержащий экземпляры класса Manager
}

addNewCompanyMember(Developer/Manager) - в кач-ве аргумента принимает экземляр класса FrontendDeveloper, Backend Developer или Manager
addProject(Project) - в кач-ве аргумента принимает экземляр класса Project
getMembersQuantity()
*/
export class Company {
    staff = {
        developers : {
            frontend : FrontendDeveloper,
            backend: BackendDeveloper
        },
        manager : Manager
    }
    constructor (companyName, currentProjects = [], completedProjects =  [], manager = [], frontend = [], backend = []) {
        this.companyName = companyName
        this.currentProjects = currentProjects.slice()
        this.completedProjects = completedProjects.slice()
        this.staff.manager = manager.slice()
        this.staff.developers.frontend = frontend.slice()
        this.staff.developers.backend = backend.slice()
    }
    addNewCompanyMember(member) {
        if (Object.getPrototypeOf(member) == Manager.prototype)
        this.staff.manager.push(member)
        if (Object.getPrototypeOf(member) == FrontendDeveloper.prototype)
        this.staff.developers.frontend.push(member)
        if (Object.getPrototypeOf(member) == BackendDeveloper.prototype)
        this.staff.developers.backend.push(member)
        member.changeCompany(this.companyName)
    }
    addProject(Project) {
        this.currentProjects.push(Project)
    }
    getMemberQuantity() {
        return this.staff.manager.length + this.staff.developers.backend.length + this.staff.developers.frontend.length
    }
}

 /*
- projectName - string
- minQualification -number
- Team -  {
    manager : экземпляр класса Manager
    developers: {
    frontend : массив содержащий экземпляры класса FrontendDeveloper
    backend : массив содержащий экземпляры класса DackendDeveloper
    }
}

completeProject()
addNewProjectMember(Developer/Manager) - Метод внутри которого вызывается проверка менеджера на то, подходит ли сотрудник проекту. Если подходит, то команда расширяется, иначе нет.
*/

export class Project {
    Team = {
        manager : Manager,
        developers : {
            frontend : FrontendDeveloper,
            backend : BackendDeveloper
        }
    }
    constructor (projectName, minQualification, manager, frontend = [], backend = []) {
        this.projectName = projectName
        if (['L1', 'L2', 'L3', 'L4'].includes(minQualification))
        this.minQualification = minQualification
        this.Team.manager = manager
        this.Team.developers.frontend = frontend.slice()
        this.Team.developers.backend = backend.slice()
    }
    completeProject() {
        this.Team.manager.projectQuantity++
        for (let i = 0; i < this.Team.developers.frontend.length; i++) {
            this.Team.developers.frontend[i].projectQuantity++
        }
        for (let j = 0; j < this.Team.developers.backend.length; j++) {
            this.Team.developers.backend[j].projectQuantity++
        }
    }
    addNewProjectMember(member) {
        if (member.grade >= this.minQualification) {
            if (member instanceof FrontendDeveloper)
            this.Team.developers.frontend.push(member)
            if (member instanceof BackendDeveloper)
            this.Team.developers.backend.push(member)
            if (member instanceof Manager)
            this.Team.manager = member
        }
    }
}
/*
projectQuantity - number
checkMember(minQuantity) - в качестве аргумента принимается строка ('L1'/'L2'/'L3'/'L4')
*/
 export class Manager extends Empleyee {
    constructor (name, grade, hardSkills, company, projectQuantity) {
        super(name, grade, hardSkills, company)
        this.projectQuantity = projectQuantity
    }
    checkMember(minQuantity, member) {
        if (minQuantity <= member.grade && member.company == this.company) return true
        else return false
    }
}

/*
stack - массив строк
- developerSide - строка ('frontend')
- projectQuantity - number
expandStack(newTech) - в кач-ве аргумента принимает строку
*/

export class FrontendDeveloper extends Empleyee {
    constructor (name, grade, hardSkills = [], company, stack = [], projectQuantity) {
        super(name, grade, [hardSkills], company)
        this.stack = stack.slice()
        this.developerSide = 'frontend'
        this.projectQuantity = projectQuantity
    }
    expandStack (newTech) {
        this.stack.push(newTech)
    }
}
export class BackendDeveloper extends Empleyee {
    constructor (name, grade, hardSkills = [], company, stack = [], projectQuantity) {
        super(name, grade, [hardSkills], company)
        this.stack = stack.slice()
        this.developerSide = 'backend'
        this.projectQuantity = projectQuantity
    }
    expandStack (newTech) {
        this.stack.push(newTech)
    }
}

// const manager = new Manager('Maxin', 'L562', '?' , "SBER", 3)
// const manager2 = new Manager('Maxin', 'L562', '?' , "SBER", 3)
// const ne = new BackendDeveloper('Maxin', 'L562', '?' , "SBER", 3, [34])
// const ne2 = new BackendDeveloper('Maxin', 'L562', '?' , "SBER", 3, [24])
// const fd = new FrontendDeveloper('Maxin', 'L562', '?' , "SBER", 3, [234])
// const fd2 = new FrontendDeveloper('Maxin', 'L562', '?' , "SBER", 3, [234])
// const p21 = new Project(' 21', 'L3', [manager2], [ne2], [fd2])
// const k21 = new Project(' 21', 'L3', [manager2], [ne2], [fd2])
// const sber = new Company('sber', '42', [p21], [manager2], [ne2], [fd2])
// const sber2 = new Company('sber', '42', ['1'], [manager2], [ne2], [fd2])

// sber.addNewCompanyMember(manager);
// sber.addNewCompanyMember(manager2);
// sber.addNewCompanyMember(ne);
// sber.addNewCompanyMember(ne2);
// sber.addNewCompanyMember(fd);
// sber.addNewCompanyMember(fd2);

// console.log(sber)
// console.log(p21)

// sber.addProject(k21)
// sber.addProject(p21)
// p21.addNewProjectMember(manager, sber);
// p21.addNewProjectMember(ne, sber);
// p21.addNewProjectMember(fd, sber);
// k21.addNewProjectMember(manager2, sber);
// k21.addNewProjectMember(ne2, sber);
// k21.addNewProjectMember(fd2, sber);
// k21.completeProject(sber

// let manager = new Manager ('Bahti', 'L2', ['lvlDesiner'], 'WB', 3)
// console.log(manager)

// let manager2 = new Manager ('Bahti2', 'L3', ['lvlDesiner'], 'Sber', 4)
// manager2.addSkill('goDev')
// console.log(manager2)

// let frontDev = new FrontendDeveloper ('Liza Bud', 'L2', 'frontJS', 'WB', ['frontJS'], 3)
// let backDev = new BackendDeveloper ('noName', 'L2', 'fullStack', 'WB', ['fullStack'], 3)
// let backDev2 = new BackendDeveloper ('noName2', 'L3', 'fullStack', 'WB', ['fullStack'], 4)

// console.log(frontDev)
// console.log(backDev)
// console.log(backDev2)

// let hardProgect = new Project ('hardProgect', 'L2', manager, [frontDev], [backDev])

// hardProgect.addNewProjectMember(backDev2)
// hardProgect.completeProject()

// console.log(manager)
// console.log(frontDev)
// console.log(backDev)
// console.log(backDev2)
// console.log(hardProgect)
// console.log(hardProgect.Team.manager.company)

// let WB = new Company ('WB', [], [], [manager], [frontDev], [backDev])

// WB.addNewCompanyMember(manager2)
// // WB.addProject(hardProgect)

// console.log(WB)
// console.log(WB.getMemberQuantity())
