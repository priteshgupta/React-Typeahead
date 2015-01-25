module.exports = (function(React) {
  'use strict';

  return React.createClass({
    getInitialState: function() {
      return {value: '', index: -1, selected: true};
    },
    handleClick: function(e) {
      this.setState({value: e.target.innerHTML, selected: true});
    },
    handleChange: function(e) {
      this.setState({value: e.target.value, selected: false, index: 0});
    },
    selectItem: function(e) {
      if (this.state.selected) return;

      if (e.keyCode === 40 && this.state.index < this.items.length - 1) {
        this.setState({index: ++this.state.index});
      }
      else if (e.keyCode === 38 && this.state.index > 0) {
        this.setState({index: --this.state.index});
      }
      else if (e.keyCode === 13) {
        this.setState({value: this.items[this.state.index].key, selected: true, index: 0});
      }
    },
    handleFocus: function(e) {
      this.setState({selected: false});
    },
    componentWillReceiveProps: function(nextProps) {
      this.setState({value: nextProps.value || '', index: -1, selected: true});
    },
    render: function() {
      this.items = [];

      var searchResult = this.state.selected || (
        <div className="list-group typeahead">
          {this.items}
        </div>
      );

      this.state.selected || customWhere(this.props.array, function(el) {
        el = el.toLowerCase();
        var val = this.state.value.toLowerCase();

        return el.indexOf(val) > -1 || el.replace('-', ' ').indexOf(val) > -1;
      }.bind(this)).every(function(el, idx) {
        if (!this.state.value && idx  > 9) return;
        var className = this.state.index === idx ? 'list-group-item active' : 'list-group-item';

        return this.items.push(<a key={el} className={className} onClick={this.handleClick}>{el}</a>);
      }, this);

      return (
        <div className="field-group">
          <input type="text" id={this.props.id} required className="form-control" value={this.state.value} placeholder={this.props.placeholder}
                  onChange={this.handleChange} onKeyDown={this.selectItem} onFocus={this.handleFocus} />
          {searchResult}
        </div>
      );
    }
  });
})(window.React);