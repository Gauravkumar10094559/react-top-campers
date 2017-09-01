import './App.css';
let React=require('react');
let api=require('./Api.js');
let PropTypes=require('prop-types');

class Loading extends React.Component{

  constructor(props) {
    super(props);
    this.state={
      text:props.text
    };
  }

  componentDidMount() {

    let stopper=this.props.text+'...';
    this.interval=window.setInterval(function() {
      if(this.state.text===stopper) {
        this.setState(function() {
          return {
            text:this.props.text
          }
        })
      } else {
        this.setState(function(prevState) {
          return {
            text:prevState.text+'.'
          }
        });
      }
    }.bind(this),this.props.speed);

  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() {
    return(
      <div>
        <h2>{this.state.text}</h2>
      </div>
    )
  }
}

Loading.defaultProps={
  text:'Loading',
  speed:400,
};

function RenderData (props) {

  return (
    
      <tbody>
        {props.lele.map(function(intel,index) {
          return (
            <tr key={intel.username}>
              <td>{index+1}</td>
              <td>
                  <img
                    className='avatar'
                    src={intel.img}
                    alt={'Avatar for ' + intel.username}
                  /> 
                  <p>{intel.username}</p>           
              </td>
              <td>{intel.recent}</td>
              <td>{intel.alltime}</td>
            </tr>
          )
        })}
      </tbody>
    
  )
}


class TableData extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      campData:null,
    };
  }

  componentDidMount() {
    let url=this.props.info;
    
    api.fetchUserData(url).then(function(response) {
      this.setState(function(){
        return {
            campData:response          
          }
        })
      }.bind(this));
  }

  componentWillReceiveProps(nextProps) {
    let data=nextProps.info;

    api.fetchUserData(data).then(function(response) {
      this.setState(function(){
        return {
          campData:response          
        }
      })
    }.bind(this));
  }

  render() {

    return (
      <div id='t-body'> 

      { !this.state.campData 
          ?<Loading /> 
          :<RenderData lele={this.state.campData.data}/>
      }
      </div>
       
    )    
  }
}


class TableHead extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      url:'https://fcctop100.herokuapp.com/api/fccusers/top/recent'
    };
     this.setURL=this.setURL.bind(this);
  }
  setURL(param) {
    this.setState(function(){
      return {
        url:'https://fcctop100.herokuapp.com/api/fccusers/top/'+param
      }
    });
  }
  render() {
    return (
        <table id="stats">
          <thead>
            <tr>
              <th>#</th>
              <th>Camper Name</th>
              <th>
                <button onClick={()=>this.setURL('recent')} >Points in past 30 days</button>
              </th>
              <th>
                <button onClick={()=>this.setURL('alltime')} >All time Points</button>
              </th>
            </tr>     
          </thead>
        <TableData info={this.state.url}/>   
      </table>
    )    
  }
}


class App extends React.Component {
  render() {
    return (
      <div> 
        <h1>freeCodeCamp</h1>
        <center>Camp Leaders </center>
        <TableHead />
      </div>
    )
  }
}
export default App;
