// OnInit:-     This interface has definition of 'ngOnInit'.
// Component:-  For @Component decorator.
import { Component, OnInit } from '@angular/core';

// -------- For reactive forms:
/**
  FormBuilder: Syntactic sugar for shortening the instance creation of FormGroup, FormArray, FormControl.

  FormGroup:   Combines each child FormControl into one object with each FormControlName as the key.
               Status of any child FormControl determines the status of the group, i.e. if one child is
               invalid, the whole group becomes invalid.

  FormControl: Any variable can be a FormControl, e.g: `variableA = new FormControl('')`

  FormArray:   Combines each FormGroup, FormControl, or FormArray into an array.
               If one of the controls in a FormArray is invalid, the entire array becomes invalid. 

  */
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { BlogStructure } from '../blogStructure'
import { CategoryStructure } from '../categoryStructure'
import { BlogContentsService } from '../blog-contents.service'
import { CheckboxStructure } from '../checkboxStructure'

import { SortStructure } from '../sortStructure'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent implements OnInit
{
  // An object of FormGroup
  objFormGroup:         FormGroup;

  // An object of FormGroup
  objFormGroupCategory: FormGroup

  variableA = new FormControl('')
  view  = new FormControl('tableView')

  categories:           CategoryStructure[]
  selectedCategory:     CategoryStructure
  selectedCategoryName = new FormControl('')

  numOfBlogsVisible:    number
  disableGenericButtons: boolean

  disableSortByMenu:    boolean


  createNewCategory:    CategoryStructure

  blogs:                BlogStructure[]

  clickedOnThisBlog:    BlogStructure
  displayNewInputForm:  boolean
  newBlog:              BlogStructure

  allCheckboxesChecked: boolean
  checkboxChecked:      boolean
  selectAllLabel:       string
  checkboxes:           CheckboxStructure[] = []

  checkedChkBoxes:    number

  mSortByOptions:       SortStructure[]
  mSelectedSortBy = new FormControl( {value: 'Creation Date' , disabled: 'disableSortByMenu'})

  mDisableMoveTo = new FormControl( { value: '', disabled: true } )

  mSelectedCategoryNameMoveTo = new FormControl( {value: 'll' , disabled: 'mDisableMoveTo'})

public filteredCheckBoxes = [];

	constructor( private objBlogContentsService: BlogContentsService,

               // FormBuilder requires a private instance in the constructor.
               private objFormBuilder: FormBuilder) 
  { 
    console.log("two")
    
  }

	getBlogsData(): void
  {
	  this.objBlogContentsService.getBlogs().subscribe( 
                                  argNext =>  this.blogs = argNext, 
                                  argError => console.log( argError ),
                                  () => console.log("Complete notification!") )


    // XYZServiceObject.getBlogs().subscribe( next, error, complete)
    
    // 'next' refers to the new value returned by the 'of' emitter.
    // 'error' refers to any error message.
    // 'complete' refers to the notification of data being fetched completely.

    // `argNext => this.blogs = argNext` translates to:
    // f( argNext )
    // {
    //    this.blogs = argNext
    //    return this.blogs
    // }
    // Here `return` is implied.

    // If we don't want a return, then function has to be written like this: 
    // `argNext => { this.blogs = argNext }`

    // With zero arguments, => has to be written like this: 
    // `() => this.blogs = argNext`
	}



  getCategoriesData(): void
  {
    this.objBlogContentsService.getCategories().subscribe( argCategories => this.categories = argCategories )
  }

  getSortByOptions(): void
  {
    this.objBlogContentsService.getSortBys().subscribe( 
                                            argSortByOptions => this.mSortByOptions = argSortByOptions)
  }  

// FormGroup getters ----------------------------------
  get getCheckboxes_FormGroup()
  {
    return this.objFormGroup.get('checkboxesBlogs') as FormArray;
  }

  get getCategoriesFG()
  {
    return this.objFormGroupCategory.get('categories') as FormArray;
  }

  public filterData()
  {
    this.filteredCheckBoxes 
          = this.getCheckboxes_FormGroup.controls.filter(( arg_data ) => arg_data.get( 'visible' ).value)
  }

// -----------------------------------------------------

	ngOnInit()
	{
    this.lm( 3, ["dd","ff","da"] )
    console.log("one")
    this.objFormGroup = this.objFormBuilder.group(
                            {
                              checkboxesBlogs: new FormArray([])
                            }
                          )

    this.objFormGroupCategory = this.objFormBuilder.group(
                            {
                              categories: new FormArray([])
                            }
                          )

    this.checkboxChecked = false
		this.getBlogsData()

    this.checkedChkBoxes = 0

    this.getCategoriesData()
    this.getSortByOptions()

    this.numOfBlogsVisible = this.blogs.length

    console.log("======this.numOfBlogsVisible: ====== ", this.numOfBlogsVisible)
    
    if( this.numOfBlogsVisible > 0 )
    {
      this.disableGenericButtons = false

      if( this.numOfBlogsVisible == 1 ) 
      {
        this.disableSortByMenu = true
      }
      else
      {
        this.disableSortByMenu = false
      }
    }
    else
    {
      this.disableGenericButtons = true
      this.disableSortByMenu     = true
    }

    for( var i = 0; i < this.blogs.length; i++)
    {
      // Generate a checkbox for this blog:
      this.getCheckboxes_FormGroup.push( this.objFormBuilder.group(
                                              {
                                                blogTitle:       [ this.blogs[i].title ],
                                                blogId:          [ this.blogs[i].id ],
                                                checkboxValue:   [ false ],
                                                body:            [ this.blogs[i].body ],
                                                creationDate:    [ this.blogs[i].creationDate ],
                                                modificationDate:[ this.blogs[i].modificationDate ],
                                                category:        [ this.blogs[i].category ],
                                                visible:         [ true ]
                                              }
                                            )
                                        );
    }

    for( var i = 0; i < this.categories.length; i++ )
    {
      // Push category values in the corresponding formgroup:
      this.getCategoriesFG.push(  this.objFormBuilder.group(
                                                {
                                                  id:           this.categories[i].id,
                                                  name:         this.categories[i].name,
                                                  description:  this.categories[i].description,
                                                  subCategories:this.categories[i].subCategories
                                                }
                                              )
                                            )
    }

    this.allCheckboxesChecked = false
    this.selectAllLabel = "Select All"
    
    this.selectedCategoryName.setValue( "All" )
    // By default, the list should be displayed accouding to category 'All', hence the function has been called manually.
    //TODOthis.onCategorySelected("All")

    this.mSelectedSortBy.setValue( "Creation date" )
    // By default, the list should be sorted by creation date, hence the function has been called
    // manually.
    this.sortByCreationDate()

    console.log(this.blogs.length)

    this.filterData()
  }

  
  onDisplayNewInputForm()
  {
    this.displayNewInputForm = true
  }
  
  onSelectAll()
  {
    console.log("this.allCheckboxesChecked: ", this.allCheckboxesChecked)
    if( this.allCheckboxesChecked == false )
    {
      for( var i = 0; i < this.blogs.length; i++)
      {
        this.getCheckboxes_FormGroup.at(i).get('checkboxValue').setValue( true )
      }

      this.allCheckboxesChecked = true
      this.mDisableMoveTo.setValue( false )
      this.selectAllLabel       = "Unselect all"
    }
    else
    {
      for( var i = 0; i < this.blogs.length; i++)
      {
        this.getCheckboxes_FormGroup.at(i).get('checkboxValue').setValue( false )
      }

      this.allCheckboxesChecked = false
      this.mDisableMoveTo.setValue( true )
      this.selectAllLabel       = "Select all"
    }
  }

  onCheckboxClicked( argIndex )
  { 
    console.log("oncheckboxclicked:" )

    // Idea here is to find how many checkboxes ave been checked. If all, the label of "Select All" button
    // will be "UnSelect All" and vice versa.

    if( !this.getCheckboxes_FormGroup.at( argIndex ).get( 'checkboxValue' ).value === true )
    {
      // Count total checked checkboxes. This is required 
      // for changing the label of 'select all' button.
      this.checkedChkBoxes    = this.checkedChkBoxes + 1

      // If at least one checkbox is checked, 
      // then 'move to' button should be enabled.
      this.mDisableMoveTo.setValue( false );
    }
    else
    {
      // Count total checked checkboxes. This is required 
      // for changing the label of 'select all' button.
      this.checkedChkBoxes = this.checkedChkBoxes - 1

      console.log("this.checkedChkBoxes: ", this.checkedChkBoxes)

      if( this.checkedChkBoxes === 0 )
      {
        this.mDisableMoveTo.setValue( true );
      }

      // If even one checkbox is unchecked, the 'allCheckboxesChecked' variable
      // will be set to false.
      // This comes in picture when the user manually clicks on checkboxes and un/selects
      // all of them. 
      this.allCheckboxesChecked = false
    }
    
    // Changing the label of the 'select all' button.
    if( this.checkedChkBoxes < this.getCheckboxes_FormGroup.controls.length )
    {
      this.selectAllLabel = "Select All"
    }
    else
    {
      this.selectAllLabel = "UnSelect All"
    }

    if( this.checkedChkBoxes === 0 )
    {
      this.mDisableMoveTo.setValue( false );
    }
  }

  onMoveToSelected()
  {
    for( var i = 0; i < this.checkboxes.length; i++)
    {
      if( this.checkboxes[i].value == true )
      {
        this.blogs[i].category = this.mSelectedCategoryNameMoveTo.value
      }
    }
  }

  onDeleteSelected()
  {    
    var selectedIds = []

    for( var i = 0; i < this.getCheckboxes_FormGroup.length; i++)
    {
      if( this.getCheckboxes_FormGroup.at(i).get('checkboxValue').value == true )
      {
        selectedIds.push(i)
      }
    }

    for( var i = 0; i < selectedIds.length; i++)
    {
        if( this.getCheckboxes_FormGroup.length > 1 )
        {
          this.getCheckboxes_FormGroup.removeAt( selectedIds[i] )
        }
        else
        {
          this.getCheckboxes_FormGroup.clear()
        }
    }

    this.numOfBlogsVisible = this.blogs.length
    if( this.numOfBlogsVisible > 0 )
    {
      this.disableGenericButtons = false

      if( this.numOfBlogsVisible == 1 ) 
      {
        this.disableSortByMenu = true
      }
      else
      {
        this.disableSortByMenu = false
      }
    }
    else
    {
      this.disableGenericButtons = true
      this.disableSortByMenu     = true
      this.mDisableMoveTo.setValue( true )
    }

    this.mDisableMoveTo.setValue( true )
  }

  onCategorySelected( ) 
  { 
    this.numOfBlogsVisible = this.blogs.length

    for( var i = 0; i < this.blogs.length; i++ )
    {
      // By default, each blog's visibility will be set to true.
      // This will be helpful also when 'All' is selected.

      this.getCheckboxes_FormGroup.at(i).get('visible').setValue( true )

      if( JSON.stringify( this.selectedCategoryName.value ) != JSON.stringify( "All" ))
      {
        // If the user selected category does NOT match this blog's category, then its visibility
        // will be turned off.
      
        if( JSON.stringify( this.getCheckboxes_FormGroup.at(i).get('category').value ) != JSON.stringify( this.selectedCategoryName.value ) )
        {
          this.getCheckboxes_FormGroup.at(i).get('visible').setValue( false )
          this.numOfBlogsVisible--
        }
      }      
    }

    if( this.numOfBlogsVisible > 0 )
    {
      this.disableGenericButtons = false

      if( this.numOfBlogsVisible == 1 ) 
      {
        this.disableSortByMenu = true
      }
      else
      {
        this.disableSortByMenu = false
      }
    }
    else
    {
      this.disableGenericButtons = true
      this.disableSortByMenu     = true
      this.mDisableMoveTo.setValue( true )
    }

    this.filterData()
  }

  onSortBySelected()
  {
    if( this.mSelectedSortBy.value == "Title" )
    {
      this.sortByTitle()
    }
    else if( this.mSelectedSortBy.value == "Creation date" )
    {
      this.sortByCreationDate()
    }
    else if( this.mSelectedSortBy.value == "Modification date" )
    {
      this.sortByModificationDate()
    }
    else if( this.mSelectedSortBy.value == "Category" )
    {
      this.sortByCategory()
    }
  }

  sortByTitle() : void
  {
    for( var i = 0; i < (this.blogs.length - 1); i++ )
    {
      if( JSON.stringify( this.blogs[i].title ) >= JSON.stringify( this.blogs[i+1].title ) )
      {
        var tempBlog : BlogStructure

        tempBlog          = this.blogs[i]
        this.blogs[i]     = this.blogs[i + 1]
        this.blogs[i + 1] = tempBlog
      }
    }
  }

  sortByCreationDate()
  {
    for( var i = 0; i < (this.blogs.length - 1); i++ )
    {
      if( Date.parse( this.blogs[i].creationDate ) >= Date.parse( this.blogs[i+1].creationDate ) )
      {
        var tempBlog: BlogStructure

        tempBlog          = this.blogs[i]
        this.blogs[i]     = this.blogs[i + 1]
        this.blogs[i + 1] = tempBlog

        var tempCheckbox: CheckboxStructure

        tempCheckbox           = this.checkboxes[i]
        this.checkboxes[i]     = this.checkboxes[i + 1]
        this.checkboxes[i + 1] = tempCheckbox

      }
    }
  }

  sortByModificationDate()
  {
    for( var i = 0; i < (this.blogs.length - 1); i++ )
    {
      if( Date.parse( this.blogs[i].modificationDate ) <= Date.parse( this.blogs[i+1].modificationDate ) )
      {
        var tempBlog : BlogStructure

        tempBlog          = this.blogs[i]
        this.blogs[i]     = this.blogs[i + 1]
        this.blogs[i + 1] = tempBlog
      }
    }
  }
  
  sortByCategory()
  {
    for( var i = 0; i < (this.blogs.length - 1); i++ )
    {      
      if( JSON.stringify( this.blogs[i].category ) >= JSON.stringify( this.blogs[i+1].category ) )
      {
        var tempBlog : BlogStructure

        tempBlog          = this.blogs[i]
        this.blogs[i]     = this.blogs[i + 1]
        this.blogs[i + 1] = tempBlog
      }
    }
  }

  
  lm( vv: number, kk: string[] )
  {
    console.log( kk )
  }

  lk()
  {
    this.lm( 33, ["dd","ff","da"] )

  }


}


function l()
{
  
}

