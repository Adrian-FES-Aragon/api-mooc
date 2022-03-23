const express = require('express');
// const res = require('express/lib/response');

const { sequelize, Professor, pData, Course, cData, Special, ProfessorCourse } = require('./models');
const professor = require('./models/professor');
const pdata = require('./models/pdata');
const course = require('./models/course');
const cdata = require('./models/cdata');
const special = require('./models/special');
const lessons = require('./models/professorcourses');

const app = express()
app.use(express.json())

//  ========================= PROFESSOR ================================= 

// POST endpoint -- To register new Professor
app.post('/professors', async (req, res) => {
  const { firstname, lastname, email } = req.body
  try {
    const professor = await Professor.create({ firstname, lastname, email })
    return res.json(professor)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

// GET endpoint -- To find All Professors
app.get('/professors', async (req, res) => {
  try {
    const professors = await Professor.findAll()

    return res.json(professors)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

// GET endpoint -- Search by UUID Professor
app.get('/professors/uuid/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const professors = await Professor.findOne({ where: { uuid }, include: 'pdata' })
    return res.json(professors)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

// GET endpoint -- Search by UUID Professor
app.get('/professors/id/:id', async (req, res) => {
  const id = req.params.id
  try {
    const professors = await Professor.findOne({ where: { id }, include: 'pdata' })
    return res.json(professors)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

// PUT to update Professor
app.put('/professors/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  const { firstname, lastname, email } = req.body
  try {
    const professor = await Professor.findOne({ where: { uuid } })

    professor.firstname = firstname
    professor.lastname = lastname
    professor.email = email

    await professor.save()

    return res.json(professor)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
    // return res.status(500).json({ error: 'Something went wrong' })
  }
})

// DELETE data by uuid
app.delete('/professors/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const professors = await Professor.findOne({ where: { uuid } })

    await professors.destroy()

    return res.json({ message: 'User deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

// ========================= PDATA ================================= 

// POST to register data into pdata 
app.post('/pData', async (req, res) => {
  const { professorUuid, phone, degree, field, charge, school, biography } = req.body // fetch professor by uuid

  try {
    const professor = await Professor.findOne({ where: { uuid: professorUuid } })

    const pdata = await pData.create({ phone, degree, field, charge, school, biography, professorId: professor.id })

    return res.json(pdata)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

// GET to fetch info of pdata 
app.get('/pData', async (req, res) => {
  try {
    const pdata = await pData.findAll({ include: 'professor' })
    /** Only if the fk has an alias
     *  const pdata = await pData.findAll({ include: [{ model: Professor, as: 'professor'}]})     
    */

    return res.json(pdata)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// ========================= COURSE ================================ 

// POST endpoint -- To create new Course
app.post('/courses', async (req, res) => {
  const { name, area, type, language } = req.body
  try {
    const course = await Course.create({ name, area, type, language })
    return res.json(course)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

// GET endpoint -- To find All Courses
app.get('/courses', async (req, res) => {
  try {
    const course = await Course.findAll({ include: 'cdata' })
    return res.json(course)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

// GET endpoint -- Search by UUID Course
app.get('/courses/uuid/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const course = await Course.findOne({ where: { uuid }, include: 'cdata' })
    return res.json(course)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

// GET endpoint -- Search by UUID Course
app.get('/courses/id/:id', async (req, res) => {
  const id = req.params.id
  try {
    const course = await Course.findOne({ where: { id }, include: 'cdata' })
    return res.json(course)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})

// PUT to update Course
app.put('/courses/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  const { name, area, type, language } = req.body
  try {
    const course = await Course.findOne({ where: { uuid } })

    course.name = name
    course.area = area
    course.type = type
    course.language = language

    await course.save()

    return res.json(course)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
    // return res.status(500).json({ error: 'Something went wrong' })
  }
})

// DELETE Course by uuid
app.delete('/courses/:uuid', async (req, res) => {
  const uuid = req.params.uuid
  try {
    const course = await Course.findOne({ where: { uuid } })
    course
    await course.destroy()

    return res.json({ message: 'Course deleted!' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Something went wrong' })
  }
})


// ========================= CDATA ================================= 

// POST to register cdata 
app.post('/cData', async (req, res) => {
  const { courseUuid, link, school, keywords, content, purpose } = req.body // fetch course by uuid

  try {
    const course = await Course.findOne({ where: { uuid: courseUuid } })

    const cdata = await cData.create({ link, school, keywords, content, purpose, courseId: course.id })

    return res.json(cdata)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

// GET to fetch info of cdata 
app.get('/cData', async (req, res) => {
  try {
    const cdata = await cData.findAll({ include: 'course' })
    /** Only if the fk has an alias
     *  const cdata = await cData.findAll({ include: [{ model: Course, as: 'course'}]})     
    */

    return res.json(cdata)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


// ========================= SPECIAL =============================== 
// POST to register data into special
app.post('/specials', async (req, res) => {
  // const { specialUuid, name } = req.body // fetch course by uuid
  const { courseUuid, name } = req.body // fetch special by course uuid

  try {
    // const special = await Special.findOne({ where: { uuid: specialUuid } })
    const course = await Course.findOne({ where: { uuid: courseUuid } })

    const special = await Special.create({ name, specialId: course.id })

    return res.json(special)
  } catch (err) {
    console.log(err)
    return res.status(400).json(err)
  }
})

app.get('/specials', async (req, res) => {
  try {
    const special = await Special.findAll({ include: 'course' })
    /** Only if the fk has an alias
     *  const cdata = await cData.findAll({ include: [{ model: Course, as: 'course'}]})     
    */
    return res.json(special)
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// ========================= LESSONS ================================
// Endpoint to fetch all the ids lessons from the professor and courses

app.get('/lessons', async (req, res) => {
  try {
    const lessons = await ProfessorCourse.findAll()

    return res.json(lessons)

  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// Endpoint to fetch all the lessons from the professor and courses
app.get('/lessons/info', async (req, res) => {
  try {
    const info = await Professor.findAll({ include: [Course] });
    // User.findAll({
    //   include: [
    //     {
    //       model: Team, 
    //       include: [
    //         Folder
    //       ]  
    //     }
    //   ]
    // });
    return res.json(info)

  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

// ========================= CONNECTION ================================
// status of connection 
app.listen({ port: 5000 }, async () => {
  console.log('Server up on http://localhost:5000')
  await sequelize.authenticate()
  console.log('Database conected!')
})