'use strict'
const connectDB = require('../lib/db')
const { ObjectId } = require('mongodb')

module.exports = {
    Query: {
        getCourses: async () => {
            let db
            let courses = []
            try {
                db = await connectDB()
                courses = await db.collection('courses').find().toArray()
            } catch (error) {
                console.log(error)
            }
            return courses
        },
        getCourse : async (root, args) => {
            let db
            let course
            try {
                db = await connectDB()
                course = await db.collection('courses').findOne({_id: ObjectId(args.id)})
            } catch (error) {
                console.log(error)
            }
            return course
        }
    }
}