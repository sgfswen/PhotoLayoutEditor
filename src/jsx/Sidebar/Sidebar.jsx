var Sidebar = React.createClass({

	displayName : 'Sidebar',

	propTypes : {
		uploadScript : React.PropTypes.string
	},

	uploader : new Uploader(),

	getDefaultProps : function()
	{
		return {
			uploadScript : null
		};
	},

	getInitialState : function()
	{
		return {
			uploadImages : [
				{
					on : false,
					style : { backgroundImage : 'url(./assets/img/tmp-simg-01.jpg)' }
				},
				{
					on : false,
					style : { backgroundImage : 'url(./assets/img/tmp-simg-02.jpg)' }
				},
				{
					on : false,
					style : { backgroundImage : 'url(./assets/img/tmp-simg-03.jpg)' }
				},
				{
					on : false,
					style : { backgroundImage : 'url(./assets/img/tmp-simg-04.jpg)' }
				}
			],
			is_loading : false
		};
	},

	/**
	 * upload images
	 *
	 * @Param {Files} array
	 */
	upload : function(files)
	{
		var self = this;
		var result = null;

		// on loading
		if (this.props.uploadScript)
		{
			this.uploader.external(this.props.uploadScript, files, function(data){
				log(data)
			});
		}
		else
		{
			this.setState({ is_loading : true });
			this.uploader.local(files, function(data){
				var result = self.state.uploadImages;
				self.setState({ is_loading : false });

				data.forEach(function(o){
					result.push({
						on : false,
						style : { backgroundImage : 'url(' + o + ')' }
					});
				});
				self.setState({ uploadImages : result });
			});
		}
		// TODO : 위에 스크립트를 사용하여 {on, style: {backgroundImage}} 형식의 데이터를 만들어내는게 목표
	},

	remove : function()
	{
		log('remove file');
	},

	attach : function()
	{
		log('attach file');
	},

	update : function(data)
	{
		this.setState({ uploadImages : data });
	},

	/**
	 * render
	 */
	render : function()
	{
		return (
			<aside className={'ple-sidebar' + ((this.state.is_loading) ? ' loading' : '')}>
                <Sidebar_Nav upload={this.upload} remove={this.remove} attach={this.attach} />
                <Sidebar_UploadFiles uploadImages={this.state.uploadImages} update={this.update} />
			</aside>
		);
	}
});
