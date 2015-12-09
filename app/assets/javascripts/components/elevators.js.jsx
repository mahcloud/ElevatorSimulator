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

  requestFloor: function(floorCount) {
    $.ajax({
      context: this,
      url: '/api/floors/',
      type: 'POST',
      data: { building_id: this.props.buildingID, floor: floorCount },
      success: function(result) {
        if(result.status != 'success') {
          alert(result.status);
        }
      }
    });
  },

  clearElevator: function(elevatorID) {
    $.ajax({
      context: this,
      url: '/api/elevators/' + elevatorID,
      type: 'PUT',
      data: { elevator: { occupied: false } },
      success: function(result) {
        if(result.status != 'success') {
          alert(result.status);
        }
      }
    });
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
    var self = this;

    var floors = [];
    var menuRow = [<td>Floors</td>];
    var distanceRow = [<td>Distance</td>];
    var tripsRow = [<td>Trips</td>];
    this.state.elevators.forEach(function(elevator) {
      if(elevator.occupied) {
        menuRow.push(<td onClick={ self.clearElevator.bind(self, elevator.elevator_id) }>Exit</td>);
      } else {
        menuRow.push(<td>Empty</td>);
      }
      distanceRow.push(<td>{ elevator.floors_count }</td>);
      tripsRow.push(<td>{ elevator.trips_count }</td>);
    });
    for(var floorCount = this.state.floorsCount; floorCount >= 1; floorCount--) {
      var elevators = [<td>{floorCount}</td>]
      this.state.elevators.forEach(function(elevator) {
        if(floorCount == elevator.current_floor) {
          elevators.push(<td>1</td>);
        } else {
          elevators.push(<td>0</td>);
        }
      });
      floors.push(<tr onClick={ this.requestFloor.bind(this, floorCount) }>{ elevators }</tr>);
    }
    floors.push(<tr>{ menuRow }</tr>);
    floors.push(<tr>{ distanceRow }</tr>);
    floors.push(<tr>{ tripsRow }</tr>);
    return floors;
  }
});
