
export class Bucket {
  constructor(
    public id: number,
    public name: string,
    public color: string,
    public createdAt: string,
    public updatedAt: string,
    public links: Array<Link>
  ) {}
}

export class Link {
  constructor(
    public id: number,
    public title: string,
    public description: string,
    public url: string,
    public createdAt: string | any,
    public updatedAt: string,
    public BucketId: number,
    public dateHasBeenFormated: boolean = false
  ) {}
}