import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[myElse]'}) // 'my' is the prefix. 'myElse' is the attribute name.

export class MyElseDirective
{
	private hasView = false;

	constructor( private objTemplateRef:   TemplateRef<any>,
				 private objViewContainer: ViewContainerRef)
	{

	}

	@Input() set myElse( condition: boolean ) 
	{
	  	if( !condition && !this.hasView ) 
	  	{
	    	this.objViewContainer.createEmbeddedView( this.objTemplateRef );
	    	this.hasView = true;
	  	} 
	  	else if( condition && this.hasView ) 
	  	{
	    	this.objViewContainer.clear();
	    	this.hasView = false;
	  	}
	}
}

