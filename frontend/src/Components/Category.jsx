import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Category = () => {

    const [categories, setCategories] = useState([])
    const [showEditDialog, setShowEditDialog] = useState(false);
    const [editCategory, setEditCategory] = useState({ id: null, name: '' });

    useEffect(()=> {
        fetchCategories();
    }, [])

    const fetchCategories = () => {
        axios.get('http://localhost:3000/auth/category')
        .then(result => {
            if(result.data.Status) {
                setCategories(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err));
    }

    const handleEdit = (category) => {
        setEditCategory(category);
        setShowEditDialog(true);
    };
    

    
    
    const saveEditedCategory = () => {
        axios.put(`http://localhost:3000/auth/edit_category/${editCategory.id}`, { name: editCategory.name })
        .then(response => {
            setShowEditDialog(false);
            fetchCategories(); 
        }).catch(error => console.log(error));
    };

    const cancelEdit = () => {
        setShowEditDialog(false);
    };

    return (
        <div className='px-5 mt-3'>
            <div className='d-flex justify-content-center'>
                <h3>Category List</h3>
            </div>
            <Link to="/dashboard/add_category" className='btn btn-success'>Add Category</Link>
            <div className='mt-3'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories.map(c => (
                                <tr key={c.id}>
                                    <td>{c.name}</td>
                                    
                                    <td>
                                        <button
                                            className="btn btn-info btn-sm me-2"
                                            onClick={() => handleEdit(c)}>Edit
                                        </button>
                                      
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>

            {showEditDialog && (
                <div style={{
                    position: 'fixed', 
                    top: '50%', 
                    left: '50%', 
                    transform: 'translate(-50%, -50%)', 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    zIndex: 1000,
                    border: '1px solid black'
                }}>
                    <h3>Edit Category</h3>
                    <input 
                        type="text" 
                        value={editCategory.name} 
                        onChange={(e) => setEditCategory({...editCategory, name: e.target.value})} 
                    />
                    <div>
                        <button onClick={saveEditedCategory}>Save</button>
                        <button onClick={cancelEdit}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Category;
