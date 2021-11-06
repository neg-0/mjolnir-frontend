import { useContext, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { AppFunctionsContext, UserDataContext } from '../../App';
import { MDBIcon } from 'mdb-react-ui-kit';
import MarkdownRenderer from '../Editor/MarkdownRenderer';
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
} from 'mdb-react-ui-kit';


export default function Favorites() {

    const userData = useContext(UserDataContext)
    const appFunctions = useContext(AppFunctionsContext)
    const [template, setTemplate] = useState([]) // The original text from the markdown file
    const [templateOptions, setTemplateOptions] = useState() // JSON object of template option names and values
    const [serializedOptions, setSerializedOptions] = useState({}) // JSON object of user-provided options
    const [formFavorites, setFormFavorites] = useState([]); //favorites state
    const user = userData.user_name;
 

    useEffect(() => {
        fetchUserFavorites()
        appFunctions
            .fetchTemplates()
            .then(templates => {
                setTemplate(templates)
            })
    }, [])


    // if (!template || !templateOptions) {
    //     return null
    // }


    async function fetchUserFavorites() {
        console.log("USER", user)
        return fetch(`http://localhost:3001/users/${user}/favorites`)
            .then(response => response.text())
            .then(json => {
                let output = JSON.parse(json)
                console.log("JSON", output)
                let filteredOutput = output.filter(formFavorites.includes(template.id))
                console.log("filter", filteredOutput)
                return filteredOutput
            })
            //filter output favorites.includes(template.id)
            .then(ouptut => setFormFavorites(ouptut))
            .catch(error => console.log(error));
    }


    //delete favorite
    async function removeFavorite(e) {
        e.preventDefault();
        // await fetch(`http://localhost:3001/users/${user}/favorites/${e.target.value}`, {
        //     method: 'DELETE'
        // })
        //     .then(user =>
        //         userData(user.favorites)
        //     )
        //     .catch(err => console.log(err))
        console.log('delete req')
    }
    
    // filter output where favorites.includes(template.id)

    
   



    //
    //
    

    return (
        <MDBCarousel showControls showIndicators dark fade  sx={{
            height: '50vh'
        }}>
            <MDBCarouselInner>
                {formFavorites.map((fav, index) => {
                    return (
                        < MDBCarouselItem className={index === 0 ? 'active' : ''} >
                            <MDBCarouselElement />
                            <Paper data-testid="editor" sx={{ zoom: '50%', width: '100%', mx: "auto", p: "1in" , height:'70%'}}>
                                <MarkdownRenderer template={fav.templates} templateOptions={fav.template_options} serializedOptions={null} />
                                </Paper>
                                <Button onClick={(e) => removeFavorite(e)} > {
                                    < MDBIcon fas icon="trash" color="black" size='1x' />
                                }</Button>
                            
                        </MDBCarouselItem>
                    )
                })}

            </MDBCarouselInner>
        </ MDBCarousel >
    );
}

/*
value={fav.template_options.id}

let user = {
    id: 1,
    name: brian,
    history: [
      {id: 1, title: "test letter", name: "Little Timmy"}
    ],
    favorites: [1, 2, 3]
  }

className={index === 0 ? 'active' : ''}

  return (
        <MDBCarousel showControls showIndicators dark fade  >
            <MDBCarouselInner>
                {templates.map((form, index) => {
                    return (
                        <MDBCarouselItem className={index === 0 ? 'active' : ''}>
                            <MDBCarouselElement src={form.image} />
                            <MDBCarouselCaption>
                                <h5>{form.formName}</h5>
                                <p>{form.data}</p>
                                <Button onClick={(e) => removeFavorite(form.serializedOptions.id)} > {
                                    < MDBIcon fas icon="trash" color="black" size='1x' />
                                }</Button>
                            </MDBCarouselCaption>
                        </MDBCarouselItem>
                    )
                })}
            </MDBCarouselInner>
        </ MDBCarousel >
    );

*/