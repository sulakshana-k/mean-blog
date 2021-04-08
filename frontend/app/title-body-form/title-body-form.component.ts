import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { BlogStructure } from '../blogStructure'
import { BlogContentsService } from '../blog-contents.service'

import { CategoryStructure } from '../categoryStructure'

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'

import { WhitespaceValidatorDirective } from '../whitespace-validator.directive'

@Component({
		selector: 'app-title-body-form',
		templateUrl: './title-body-form.component.html',
		styleUrls: ['./title-body-form.component.css']
})

export class TitleBodyFormComponent implements OnInit 
{
		// An object of FormGroup for title, body, and category name.
		objFormGroup: FormGroup;

		// These datastructures act like databases.
		blog:         BlogStructure
		blogs:        BlogStructure[] 
		mBlogId:      number
		categories:   CategoryStructure[]

		// Booleans to be accessed in HTML.
		mReadMode: 					 boolean 
		mBlogPushed:         boolean
		mNewCategory:        boolean
		mEnableSaveButton:   boolean
		mEnableDeleteButton: boolean

		constructor(  // Service for fetching the blog data from server.
						private objBlogContentsService: BlogContentsService,

					// Used for fetching text from URLs.
					private objActivatedRoute: ActivatedRoute,

					// FormBuilder is a shortcut way of putting formcontrols in formgroups.
					private objFormBuilder: FormBuilder ) 
		{ }

		ngOnInit()
		{
				this.mReadMode = true;
				/// -------:Fetch blogs data:--------------------------------------- ///
				// This will fetch blog id from the URL.
				this.mBlogId = +this.objActivatedRoute.snapshot.paramMap.get('id');

				this.objBlogContentsService.getBlog( this.mBlogId ).subscribe( blog => this.blog = blog )
				this.objBlogContentsService.getBlogs().subscribe( blogs => this.blogs = blogs )

				for(var i = 0; i < this.blogs.length; i++)
				{
						console.log(this.blogs[i].title)
				}

				// This is a new blog to be created and then pushed.
				if( this.mBlogId == this.blogs.length )
				{
						this.mBlogPushed = false
				}
				// This is an old blog to be edited.
				else
				{
						this.mBlogPushed = true
				}


				/// -------: Fetch categories data :---------------------------------
				this.objBlogContentsService.getCategories().subscribe( categories => this.categories = categories )

				/// -------: Here the fields for form group are created. 
				/// -------: Values for these fileds will be fetched from HTML :-------------

				if( this.mBlogPushed === false )
				{
						// A new blog will be created:
						this.objFormGroup = this.objFormBuilder.group(
						{
								blogTitle: [ '', [ Validators.required, Validators.minLength(5) ] ],
								body:      [ '' ],
								category:  [ '' ]
						} )
				}
				else
				{
						// An existing blog will be edited.
						this.objFormGroup = this.objFormBuilder.group(
						{
								/// ---------: This throws error "Expected validator to return Promise or Observable". :--------
								// blogTitle: [ this.blogs[this.mBlogId].title, Validators.required, Validators.minLength(5) ],
								/// Reason is that Validator is the 2nd argument, it has to be written as follows:

								blogTitle: [ this.blogs[this.mBlogId].title, [Validators.required, Validators.minLength(5)  ] ],
								body:      [ this.blogs[this.mBlogId].body ],
								category:  [ this.blogs[this.mBlogId].category ]
						} ) 
				}
		}

		/// -: ------- Form group getter functions -------- :-
		// This returns 'blogTitle' directly. We only need to access it by '.value'.
		// Like this: 'this.getBlogTitle.value'
		get getBlogTitle()
		{
				return this.objFormGroup.get('blogTitle') as FormControl;
		}

		get getBody()
		{
				return this.objFormGroup.get('body') as FormControl;
		}

		get getCategory()
		{
				return this.objFormGroup.get('category') as FormControl;
		}

		/// -: --------- HTML callbacks ---------- :-
		onSave()
		{
				var today = new Date( Date.now() ).toLocaleString()

				// If the blog is new and hasn't been pushed yet.
				if( this.mBlogPushed === false )
				{      
						this.blogs.push(
										{
											title:            this.getBlogTitle.value, 
											id:               this.mBlogId, 
											body:             this.getBody.value,
											creationDate:     today.toString(),
											modificationDate: today.toString(),                  
											category:         this.getCategory.value,
											show:             true
										} 
									)

						this.mBlogPushed = true
				}
				// If save is clicked once, then new blog will be pushed,
				// In the same window, if the user changes something and clicks 'Save'
				// again, same blog should not be pushed again. Already pushed blog
				// should just be updated. 
				else 
				{
						this.blogs[ this.mBlogId ].modificationDate = today.toString(),
						this.blogs[ this.mBlogId ].title            = this.getBlogTitle.value,
						this.blogs[ this.mBlogId ].body             = this.getBody.value,
						this.blogs[ this.mBlogId ].category         = this.getCategory.value
				}
		}
}












