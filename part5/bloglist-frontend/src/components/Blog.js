import { useState } from 'react'
import blogs from '../services/blogs'

const Blog = ({ blog, user, updateBlog, removeBlog }) => {
  const [expanded, setExpanded] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
 

  const hideWhenExpanded = { display: expanded ? 'none': '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }
  const toggleExpanded = () => {
    setExpanded(!expanded)
  }


  const showDeleteButton = { display: (blog.user.username === user.username) ? '': 'none' }

  const addOneLike = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    setLikes(likes + 1)
    updateBlog(updatedBlog, blog.id)
    
  } 

  const handleRemoveBlog = () => {
    removeBlog(blog)
    
  }

  const blogStyle = {
    border: 'solid',
    paddingTop: 10,
    paddingLeft: 2,
    borderRadius: 5,
    margin: 5
  }

  return(
    <div style={blogStyle}>
      <div style={hideWhenExpanded}>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>view</button>
      </div>
      <div style={showWhenExpanded} className="expandedBlog">
        <p>
          {blog.title} {blog.author}
          <button onClick={toggleExpanded}>hide</button>
        </p>
        <p>{blog.url}</p>
        <p>likes {likes} <button id='likeButton' onClick={addOneLike}>like</button></p>
        <p>{blog.user.name}</p>
        <button id='removeButton' style={showDeleteButton} onClick={handleRemoveBlog}>remove</button>
      </div>
    </div>
  )
}

export default Blog