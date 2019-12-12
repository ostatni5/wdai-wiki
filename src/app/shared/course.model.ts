import { CourseType } from './course-type.enum'
import { Person } from './person.model'

export class Course {
    index:number
    guid:string
    name:string
    host:Person
    ETCS:number
    semester:number
    type:CourseType
    capacity:number
    rating:number
    votes:number
    image:string
}
//FOR GENERATOR https://www.json-generator.com/
// [
//     '{{repeat(10)}}',
//     {   
//       index: '{{index()}}',
//       guid: '{{guid()}}',  
//       name: '{{lorem(2, "words")}}',
//       host:{
//         firstName:'{{firstName()}}',
//          lastName:'{{surname()}}'      
//       },
//       ETCS:'{{integer(1, 12)}}',
//       semester: '{{integer(1, 7)}}',
//       type: '{{random("lecture","exercises", "labs","projects")}}',
//       capacity: '{{integer(30, 220)}}',   
//       rating: '{{floating(1,5)}}',
//       votes: '{{integer(10,80)}}',
//        image: 'assets/img/{{integer(1, 3)}}.png'
//     }    
     
//   ]
  