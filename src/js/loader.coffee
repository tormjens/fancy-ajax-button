((factory) ->
	if typeof define == 'function' and define.amd
		# AMD. Register as an anonymous module.
		define [], factory
	else if typeof exports == 'object'
		# Node/CommonJS
		module.exports = factory()
	else
		# Browser globals
		window.SubmitButton = factory()
)( ->
	'use strict'
	class SubmitButton
		constructor: (@target, @url, @active) ->
			@element = document.querySelector(@target)
			@requestComplete = false
			@classPrefix = 'submit-button-loader'
			@addNodes()
			@setClasses()
			@bindEvents()

		addNodes: ->
			node = document.createElement("span")
			node.className = @classPrefix + '-progress'
			@element.appendChild(node)

		setClasses: ->
			@addClass @classPrefix
			if @active
				@addClass @classPrefix + '-active'

		hasClass: (className) ->
			return @element.className.indexOf(className) > -1

		addClass: (className) ->
			if !@hasClass className
				@element.className += ' ' + className
				@element.className = @element.className.trim()

		removeClass: (className) ->
			if @hasClass className
				@element.className = @element.className.replace className, ''
				@element.className = @element.className.trim()

		bindEvents: ->
			@element.addEventListener "click", @clickButton.bind(this), false

		clickButton: (event) ->
			event.preventDefault()

			@startLoading()

		startLoading: ->
			if !@hasClass @classPrefix + '-loading'
				@addClass @classPrefix + '-loading'
				@performRequest()
				_this = this
				interval = setInterval ->
					if _this.requestComplete
						clearInterval interval
						_this.stopLoading()
				, 2000

		stopLoading: ->
			@removeClass @classPrefix + '-loading'
			@addClass @classPrefix + '-complete'
			_this = this
			setTimeout ->
				_this.removeClass _this.classPrefix + '-complete'
				if _this.hasClass _this.classPrefix + '-active'
					_this.removeClass _this.classPrefix + '-active'
				else
					_this.addClass _this.classPrefix + '-active'
			, 1000

		performRequest: ->
			request = new XMLHttpRequest()
			url = @url
			parms = 'fname=Chris&lname=Raley&age=26&favoriteFood=turkey'
			request.open('POST', url, false)
			request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")

			request.onprogress = @updateProgress.bind(this)
			request.send(parms)

			if request.status == 200
				@requestComplete = true

		updateProgress: (event) ->
			percentComplete = (evt.loaded / evt.total)*100

			console.log percentComplete





	return SubmitButton
)
