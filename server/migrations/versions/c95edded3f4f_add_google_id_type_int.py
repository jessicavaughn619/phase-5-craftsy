"""Add google_id type int

Revision ID: c95edded3f4f
Revises: 857d8c711915
Create Date: 2023-06-27 11:19:09.864885

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "c95edded3f4f"
down_revision = "857d8c711915"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.add_column(sa.Column("google_id", sa.Integer(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table("users", schema=None) as batch_op:
        batch_op.drop_column("google_id")

    # ### end Alembic commands ###
