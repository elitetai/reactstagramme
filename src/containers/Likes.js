import React, { useEffect, useState } from 'react'
import {BiLike} from 'react-icons/bi'
import axios from 'axios'
import { Badge, ListGroupItem } from 'reactstrap'

export default function Likes(props){
    const { imageId } = props
    const [like, setLike] = useState(false)
    const [totalLikes, setTotalLikes] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/images/${imageId}/toggle_like`,
        {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then(response => {
            setLike(response.data.liked)
            setTotalLikes(response.data.total_likes)
        })
        .catch(error => {
            console.log(error)
        })
    }, [imageId])

    const toggleLike = () => {
        axios({
            method: 'POST',
            url: `http://localhost:5000/api/images/${imageId}/toggle_like`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem('token')
            }
        })
        .then(response => {
            setLike(response.data.liked)
            setTotalLikes(response.data.total_likes)
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <> 
        <ListGroupItem className="justify-content-between">
            <BiLike type='button' onClick={toggleLike} style={{color:like ? "blue":null}} /> &nbsp; 
            <Badge pill>{totalLikes==null? 0 : totalLikes} like</Badge>
        </ListGroupItem>
        </>
    )
}