import React, { useEffect, useState } from 'react'
import Addtask from '../components/Addtask'
import { getprojects } from '../service/allAPI'
import { Button, Modal } from 'react-bootstrap'
import { addprojects } from '../service/allAPI';
import { toast } from 'react-toastify';


function ProjectList() {
 const [show, setShow] = useState(false);
 const[tasks,settasks]=useState([])
    const[prodata,setprodata]=useState({projname:'',projmanager:'',teammembers:'',startdate:'',enddate:'',budget:''})
    console.log(prodata);
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
     getallprojects()
    }, [])
    

const addingprocess=async()=>{
  
    
    try {

      const payload = {
        projname: prodata.projname,
        projmanager: prodata.projmanager,
        teammembers: prodata.teammembers
          .split(',')
          .map(name => name.trim()), 
        startdate: new Date(prodata.startdate),
        enddate: new Date(prodata.enddate),
        budget: Number(prodata.budget)
      };
      const out= await addprojects(payload)
      console.log(out);
      if (out.status==200) {
        setprodata({projname:'',projmanager:'',teammembers:'',startdate:'',enddate:'',budget:''})
        toast.success(out.data.message)
        getallprojects()
        handleClose()
      }
      
    } catch (error) {
      console.log(error);
      
    }
  
}

const getallprojects=async()=>{
  try {
    const out= await getprojects()
    console.log(out);
    
    if (out.status==200) {
      
      settasks(out.data.project)
    }
  } catch (error) {
    console.log(error);
    
  }
}

  return (
    <div className='vh-100 row'>
        <div className='col-2'>
           <div><button onClick={handleShow} className='btn btn-dark m-4'>Create Task</button></div>  
           <Modal
                   show={show}
                   onHide={handleClose}
                   backdrop="static"
                   keyboard={false}
                 >
                   <Modal.Header closeButton>
                     <Modal.Title>Create Project</Modal.Title>
                   </Modal.Header>
                   <Modal.Body className='d-flex justify-content-center'>
                <div>
                <div><input value={prodata.projname} onChange={e=>setprodata({...prodata,projname:e.target.value})} type="text"  className='mb-3' placeholder='Project Name'/></div>          
                 <div><input  value={prodata.projmanager} onChange={e=>setprodata({...prodata,projmanager:e.target.value})}  type="text" className='mb-3' placeholder='Manager'/></div>  
                 <div><input value={prodata.teammembers} onChange={e=>setprodata({...prodata,teammembers:e.target.value})} type="text" className='mb-3' placeholder='Team Members'/></div>          
                 <div><input value={prodata.startdate} onChange={e=>setprodata({...prodata,startdate:e.target.value})} type="date" className='mb-3' placeholder='Stating Date'/></div>          
                 <div><input value={prodata.enddate} onChange={e=>setprodata({...prodata,enddate:e.target.value})} type="date" className='mb-3' placeholder='Ending Date'/></div>          
                 <div><input value={prodata.budget} onChange={e=>setprodata({...prodata,budget:e.target.value})} type="text"  className='mb-3' placeholder='Budget'/></div>         
                   </div>     
           
                   </Modal.Body>
                   <Modal.Footer>
                   
                     <Button onClick={addingprocess} variant="primary">Add</Button>
                   </Modal.Footer>
                 </Modal>
        </div>
        <div className='col-10'>
            <div className='row'>
                {
                  tasks?.length>0?
                     tasks.map(pros=>(
                      <div className='col-6 col-sm-3'>
                     <div className='card'>
                      <div className='ms-auto p-2' ><i onClick={()=>deletetask(task._id)} className="bi bi-x-circle"></i></div>
                      <div class="card-body">
      <h5 class="card-title text-center p-4">{pros.projname}</h5>
    </div>
    <div className='d-flex justify-content-between p-2'>
      <h6>{pros.enddate}</h6>
      <div><i class="bi bi-pencil-square"></i></div>
  
    </div>
                     </div>
                     </div>
                     )):
                   <h1> No Projects Added Yet </h1>
                }
            </div>
        </div>
    </div>
  )
}

export default ProjectList