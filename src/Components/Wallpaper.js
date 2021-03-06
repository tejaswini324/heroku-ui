import React from 'react';
import '../Styles/home.css';
import axios  from 'axios';
import { withRouter } from 'react-router-dom'; 

 class Wallpaper extends React.Component{
     constructor(){
         super();
         this.state ={
             restaurants:[],
             inputTxt:undefined,
             suggestions: [],            
         }
     }
     

     // wallpaper
     handleDDChange =(event) => {
       const locationId =  event.target.value;
       sessionStorage.setItem('location',locationId);

// http://localhost:2031
// https://tranquil-beach-55843


       axios({
        url: `http://tranquil-beach-55843/restaurantsbylocation/${locationId}`,
        method:"GET",
        headers:{'Content-Type': 'application/json'}
     }).then(response =>{
         this.setState({restaurants : response.data.restaurants})
     }).catch()

    }

    handleInputChange=(event)=>{
        const input=event.target.value;

        const {restaurants}=this.state;
         
        let filteredRes = [];

        if(input.length > 0){
            filteredRes= restaurants.filter(item=>item.name.toLowerCase().includes(input.toLowerCase()));
        }
        this.setState(()=>({
            suggestions : filteredRes,
            inputTxt : input
        }))
        
    }

    renderSuggestions = () => {
        const { suggestions } = this.state;

        if (suggestions.length === 0) {
            return null;
        }
        return (
            <ul >
                {
                    suggestions.map((item, index) => (<li key={index} onClick={() => this.selectedText(item)}>{`${item.name}, ${item.city}`}</li>))
                }
            </ul>
        );
    }


    selectedText=(restaurants)=>{
        this.props.history.push(`/details?restaurantId=${restaurants._id}`);
    }
    //header
    handleNavigate = () =>{
        this.props.history.push('/');
    }
    render(){
        // wallpaper
        const {locationData}= this.props;
        const {inputTxt}=this.state;
         return(
             
            <div>
                
                {/*wallpaper*/}
                 <img src="./Assets/homepageimg.png" alt="pic" width="100%" height="400px"></img>
                 <div className="logo">
                 <b className="e">e!</b>
                <div className="Find-the-best-restaurants-cafs-and-bars">Find the best restaurants cafs and bars</div>
            <div className="s1">
             <select className="select" onChange ={this.handleDDChange}>
                 <option placeholder="Pleas type a location" value="0">Select</option>
                 { locationData.map((item , index)=>{
                    return <option key = { index } className="dropdown" value={item.location_id}>{`${item.name},${item.city} `}</option>
                 })}
                 
             </select>
         </div>
         <div>
            <div className="notebooks">
            {/*<span className="glyphicon glyphicon-search search"></span>*/}
            
            <input id="query"type="text" className="form-control" placeholder="Search for restaurants"name="Search for restaurants" onChange={this.handleInputChange}  
            value={inputTxt}/>  
            { this.renderSuggestions() }
            </div>  
         </div>
    </div>
</div>
         )
     }
 }

 export default withRouter(Wallpaper);
