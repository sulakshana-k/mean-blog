export interface CategoryStructure
{
	id: 		 number
	name: 		 string
	description: string	
	
	subCategories: CategoryStructure[]
}
