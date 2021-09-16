
import React from 'react';
import service from './service'

class Homepage extends React.Component {
  state = {
    query:'',
    list: []
  }

  handleChange = async (e) =>{
    try {
      await this.setState({
      query: e.target.value
    })
     this.searchCity(this.state.query)
    } catch(err){
      console.log(err)
    }
  }
  searchCity = (keyword) =>{  
    if (keyword.length === 0){
      this.setState({
        list:[]
      })
    } else {
      service
        .post(`/cities`, {keyword})
        .then(response =>{
          const newList = [...response.data].splice(0,100)
          this.setState({
            list: newList
          })
          console.log('LOOKING =>', keyword, newList)
        })
        .catch(err=>console.log(err))
    }
    
  }

  render(){
    let metropole = this.state.list.filter(el=>el.codePostal[0]!=="9");
    let outreMer = this.state.list.filter(el=>el.codePostal[0]==="9");

    return (
      <>
        <div className='searchBar' >
        <h1>Je recherche...</h1>
          <input type='search' name='searchCity' value={this.state.query} onChange={(e)=>this.handleChange(e)} placeholder='...une ville, un code postal'/>
        
        </div>
        <main className='result'>
          <div className='metropole'>
          <h2>Villes de Metropole</h2>
            <div className='summary'>
              {metropole.length>0 ? <p style={{"backgroundColor":"#39BB37"}}>{metropole.length} villes corespondant au texte ainsi</p> : <p style={{"backgroundColor":"#BB3737"}}>Aucune ville corespondant au texte ainsi</p>  }
            </div>
             <div className='cityList'>
            {metropole.map((el,id)=>{
              return <div  className='eachCity' key={id}><p>{el.nomCommune}</p> <p className='codePostal'>{el.codePostal}</p></div>
            })}
            </div>
          </div>
            <div className='outreMer'>
            <h2>Villes d'Outre-Mer'</h2>
             <div className='summary'>
              {outreMer.length>0 ? <p style={{"backgroundColor":"#39BB37"}}>{outreMer.length} villes corespondant au texte ainsi</p> : <p style={{"backgroundColor":"#BB3737"}}>Aucune ville corespondant au texte ainsi</p>  }
            </div>
              <div className='cityList'>
              {outreMer.map((el,id)=>{
              return <div className='eachCity' key={id}><p>{el.nomCommune}</p> <p className='codePostal'>{el.codePostal}</p></div>
              })}
              </div>
          </div>
        </main>
      </>
    )
  }
}
export default Homepage