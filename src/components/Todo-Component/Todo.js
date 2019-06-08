import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';
import Card from '@material-ui/core/Card';



const redColor = red[500];
const greenColor = green[500];
const blueColor = blue[500];

const useStyles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  textField: {
    marginLeft: '16px',
    marginRight: '16px',
    width: 200,
  },
  fab: {
    margin: '25px',
    width: '40px',
    height: '40px',
    color: '#ffffff',
  },
  extendedIcon: {
    marginRight: '16px',
  },
  commonFab: {
    width: '45px',
    height: '45px',
    margin: '15px',
  },
  editFab: {
    backgroundColor: blueColor,
  },
  deleteFab: {
    backgroundColor: redColor,
  },
  doneFab: {
    backgroundColor: greenColor,
  },
  card: {
    width: '500px',
    margin: '20px 0px',
    padding: '20px',
  },
  containerUl: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fabContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  noteText: {
    fontSize: '20px',
  }
});

class Todo extends React.Component {
  state = {
    edit: false,
    id: null,
    mockData: [{
      id: '1',
      title: 'Buy Milk',
      done: false,
      date: new Date()
    },
    {
      id: '2',
      title: 'Meeting with Ali',
      done: false,
      date: new Date()
    },
    {
      id: '3',
      title: 'Tea break',
      done: false,
      date: new Date()
    },
    {
      id: '4',
      title: 'Go for a run.',
      done: false,
      date: new Date()
    }
  ]};

  constructor(props)
  {
    super(props);
  }

  onSubmitHandle(event) {
    event.preventDefault();
    this.setState({
      mockData: [...this.state.mockData,
        {
          id: Date.now(),
          title: event.target.item.value,
          done: false,
          date: new Date()
        }]
    });
    event.target.item.value = '';
  }

  onDeleteHandle() {
    let id = arguments[0];
    this.setState({
      mockData: this.state.mockData.filter(item => {
        if (item.id !== id) {
          return item;
        }
      })
    });
  }

  onEditHandle(event) {
    this.setState({
      edit: true,
      id: arguments[0],
      title: arguments[1]
    });
  }

  onCompleteHandle(event) {
    let id = arguments[0];
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === id) {
          item['done'] = true;
          return item;
        }
        return item;
      })
    });
  }

  onUpdateHandle(event) {
    event.preventDefault();
    this.setState({
      mockData: this.state.mockData.map(item => {
        if (item.id === this.state.id) {
          item['title'] = event.target.updatedItem.value;
          return item;
        }
        return item;
      })
    });
    this.setState({
      edit: false
    });
  }

  renderEditForm() {
    if (this.state.edit) {
      const { classes } = this.props;
      return (
        <form onSubmit={this.onUpdateHandle.bind(this)}>
          <TextField
            name="updatedItem"
            defaultValue={this.state.title}
            label="Update Item"
            placeholder="Add Item's new name here"
            margin="normal"
          />
          <Fab
            aria-label="Edit"
            className={[classes.fab,classes.editFab,classes.commonFab].join(" ")}
            type='submit'
          >
            <EditIcon/>
          </Fab>
        </form>
      )
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <h1>Minimal To-Do App</h1>
        <form onSubmit={this.onSubmitHandle.bind(this)} className={classes.container}>
          <TextField
            name="item"
            className={classes.textField}
            label="Add item"
            placeholder="Add a new item here"
            margin="normal"
          />
          <Fab color="primary" aria-label="Add" className={classes.fab} type='submit'>
            <AddIcon />
          </Fab>
        </form>
        <ul className={classes.containerUl}>
          {
            this.state.mockData.map(item => (
              <Card className={classes.card}>
                <li
                  key={item.id}
                  className={ item.done ? 'done' : 'hidden' }
                >
                  <p className={classes.noteText}> {item.title}</p>
                  <div className={classes.fabContainer}>
                    <Fab
                      aria-label="Delete"
                      className={[classes.fab,classes.deleteFab,classes.commonFab].join(" ")}
                      onClick={this.onDeleteHandle.bind(this, item.id)}
                    >
                      <DeleteIcon />
                    </Fab>
                    <Fab
                      aria-label="Edit"
                      className={[classes.fab,classes.editFab,classes.commonFab].join(" ")}
                      onClick={this.onEditHandle.bind(this, item.id, item.title)}
                    >
                      <EditIcon/>
                    </Fab>
                    <Fab
                      aria-label="Complete"
                      className={[classes.fab,classes.doneFab,classes.commonFab].join(" ")}
                      onClick={this.onCompleteHandle.bind(this, item.id)}
                    >
                      <DoneIcon/>
                    </Fab>
                  </div>
                </li>

                {this.renderEditForm()}
              </Card>
            )
            )}
        </ul>
      </div>
    );
  }
}

export default withStyles(useStyles())(Todo);
