import { CourseType } from './course-type.enum'
import { Person } from './person.model'

export class Course {
    index: number
    guid: string
    name: string
    host: Person
    ETCS: number
    semester: number
    type: CourseType
    capacity: number
    rating: number
    votes: number
    image: string
    constructor(obj?) {
        this.index=-1;
        this.guid= this.uuidv4();
        this.host = new Person();
        if (obj) {
            this.name=obj.name;
            this.host.firstName=obj.hostFirstName;
            this.host.lastName=obj.hostLastName;
            this.ETCS=obj.ETCS
            this.semester=obj.semester
            this.type=obj.type
            this.capacity=obj.capacity
            this.rating=0
            this.votes=0
            this.image=obj.image
        }
    }

    private uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      }
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
