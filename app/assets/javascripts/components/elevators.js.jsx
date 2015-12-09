var Elevators = React.createClass({
  propTypes: {
    buildingID: React.PropTypes.number.isRequired
  },

  getInitialState: function() {
    return {
      elevators: null,
      floorsCount: 1
    };
  },

  componentDidMount: function() {
    this.loadElevators();
  },

  componentWillUnmount: function() {
    this.firebaseRef.off();
  },

  loadElevators: function() {
    this.firebaseRef = new Firebase("https://elevator-simulator.firebaseio.com/buildings/" + this.props.buildingID);
    this.firebaseRef.on("value", function(dataSnapshot) {
      this.setState({
        elevators: dataSnapshot.val().elevators,
        floorsCount: dataSnapshot.val().floors
      });
    }.bind(this));
  },

  render: function() {
    var self = this;

    if(this.state.elevators === null) {
      return (
        <div></div>
      );
    } else {
      return (
        <table>
          <tbody>
            { self.renderFloors() }
          </tbody>
        </table>
      );
    }
  },

  renderFloors: function(elevator) {
    var floors = [];
    for(var floorCount = this.state.floorsCount; floorCount >= 1; floorCount--) {
      var elevators = [<td>{floorCount}</td>]
      this.state.elevators.forEach(function(elevator) {
        if(floorCount == elevator.current_floor) {
          elevators.push(<td>1</td>);
        } else {
          elevators.push(<td>0</td>);
        }
      })
      floors.push(<tr>{ elevators }</tr>);
    }
    return floors;
  }
});
