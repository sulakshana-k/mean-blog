import { Injectable } from '@angular/core';

import { BlogStructure } from './blogStructure'
import { BLOGS } from './mockBlogs'

import { CategoryStructure } from './categoryStructure'
import { CATEGORIES } from './mockCategories'

import { SortStructure } from './sortStructure'
import { SORTBYS } from './mockSortBy'

import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root'
})

export class BlogContentsService
{
	getBlogs() : Observable< BlogStructure[] >
	{
		return of( BLOGS )
	}

	getBlog( id: number ) : Observable< BlogStructure >
	{

		return of( BLOGS.find( blog => blog.id === id ))
	}

	getCategories() : Observable< CategoryStructure[] >
	{
		return of( CATEGORIES )
	}

	getCategory( id: number ) : Observable< CategoryStructure >
	{
		return of( CATEGORIES.find( category => category.id === id ))
	}

	getSortBys() : Observable< SortStructure[] >
	{
		return of(SORTBYS)
	}

  	constructor() { }
}
